import { computeStats } from './stats'
import type {
  BenchmarkConfig,
  BenchmarkSuite,
  BenchmarkSuiteResult,
  LibraryResult,
  BenchmarkProgress,
} from './types'

const DEFAULT_CONFIG: BenchmarkConfig = {
  iterations: 1000,
  warmUpIterations: 50,
}

function yield_(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export async function runSuite(
  suite: BenchmarkSuite,
  config: Partial<BenchmarkConfig> = {},
  onProgress?: (progress: BenchmarkProgress) => void,
): Promise<BenchmarkSuiteResult[]> {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const results: BenchmarkSuiteResult[] = []

  for (let caseIdx = 0; caseIdx < suite.cases.length; caseIdx++) {
    const benchCase = suite.cases[caseIdx]!
    const libraryResults: LibraryResult[] = []

    for (const entry of benchCase.adapters) {
      onProgress?.({
        suiteName: suite.name,
        caseIndex: caseIdx,
        totalCases: suite.cases.length,
        libraryName: entry.adapter.name,
      })

      // Sanity check: verify correctness first
      let actual: number
      let correct: boolean
      try {
        actual = entry.fn()
        correct = Math.abs(actual - entry.expected) < Math.abs(entry.expected) * 0.01 + 0.01
      } catch {
        actual = NaN
        correct = false
      }

      // Warm-up
      for (let i = 0; i < cfg.warmUpIterations; i++) {
        try {
          entry.fn()
        } catch {
          // ignore warm-up errors
        }
      }

      // Pre-allocate timing storage
      const timings = new Float64Array(cfg.iterations)

      // Measured iterations
      for (let i = 0; i < cfg.iterations; i++) {
        const start = performance.now()
        entry.fn()
        const end = performance.now()
        timings[i] = end - start
      }

      const stats = computeStats(timings, cfg.iterations)

      libraryResults.push({
        library: entry.adapter.name,
        stats,
        correct,
        expectedApprox: entry.expected,
        actual,
      })

      // Yield between libraries to keep UI responsive
      await yield_()
    }

    results.push({
      caseName: benchCase.name,
      results: libraryResults,
    })

    // Yield between cases
    await yield_()
  }

  return results
}

export async function runAllSuites(
  suites: BenchmarkSuite[],
  config: Partial<BenchmarkConfig> = {},
  onProgress?: (progress: BenchmarkProgress & { suiteIndex: number; totalSuites: number }) => void,
): Promise<{ suiteName: string; results: BenchmarkSuiteResult[] }[]> {
  const allResults: { suiteName: string; results: BenchmarkSuiteResult[] }[] = []

  for (let si = 0; si < suites.length; si++) {
    const suite = suites[si]!
    const results = await runSuite(suite, config, (progress) => {
      onProgress?.({ ...progress, suiteIndex: si, totalSuites: suites.length })
    })
    allResults.push({ suiteName: suite.name, results })
  }

  return allResults
}

export function formatResultsAsMarkdown(
  allResults: { suiteName: string; results: BenchmarkSuiteResult[] }[],
  config: BenchmarkConfig,
): string {
  const lines: string[] = []
  lines.push(`# Benchmark Results`)
  lines.push(``)
  lines.push(`- **Iterations**: ${config.iterations}`)
  lines.push(`- **Warm-up**: ${config.warmUpIterations}`)
  lines.push(`- **Date**: ${new Date().toISOString()}`)
  lines.push(``)

  for (const suite of allResults) {
    lines.push(`## ${suite.suiteName}`)
    lines.push(``)

    for (const caseResult of suite.results) {
      lines.push(`### ${caseResult.caseName}`)
      lines.push(``)
      lines.push(`| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |`)
      lines.push(`|---------|-------------|---------|----------|---------|`)

      // Find raw math baseline for "vs Raw Math" comparison
      const rawMath = caseResult.results.find((r) => r.library === 'Raw Math')

      for (const result of caseResult.results) {
        const median = result.stats.median.toFixed(4)
        const opsPerSec = result.stats.opsPerSec > 1e6
          ? `${(result.stats.opsPerSec / 1e6).toFixed(1)}M`
          : result.stats.opsPerSec > 1e3
            ? `${(result.stats.opsPerSec / 1e3).toFixed(1)}K`
            : result.stats.opsPerSec.toFixed(0)
        const p95 = result.stats.p95.toFixed(4)
        const correctStr = result.correct ? 'yes' : 'NO'
        lines.push(`| ${result.library} | ${median} | ${opsPerSec} | ${p95} | ${correctStr} |`)
      }

      if (rawMath && rawMath.stats.median > 0) {
        lines.push(``)
        lines.push(`*Relative to Raw Math:*`)
        for (const result of caseResult.results) {
          if (result.library === 'Raw Math') continue
          const ratio = result.stats.median / rawMath.stats.median
          lines.push(`- ${result.library}: ${ratio.toFixed(1)}x`)
        }
      }

      lines.push(``)
    }
  }

  return lines.join('\n')
}
