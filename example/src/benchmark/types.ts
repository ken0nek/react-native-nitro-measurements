export interface BenchmarkStats {
  median: number
  mean: number
  min: number
  max: number
  p95: number
  stdDev: number
  opsPerSec: number
  trimmedMean: number
  iterations: number
}

export interface BenchmarkCase {
  name: string
  fn: () => void
}

export interface ConversionAdapter {
  name: string
  convert: (value: number, from: string, to: string) => number
  add?: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) => number
  subtract?: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) => number
}

export interface BenchmarkSuiteResult {
  caseName: string
  results: LibraryResult[]
}

export interface LibraryResult {
  library: string
  stats: BenchmarkStats
  correct: boolean
  expectedApprox?: number
  actual?: number
}

export interface BenchmarkSuite {
  name: string
  cases: BenchmarkSuiteCase[]
}

export interface BenchmarkSuiteCase {
  name: string
  adapters: { adapter: ConversionAdapter; fn: () => number; expected: number }[]
}

export interface BenchmarkConfig {
  iterations: number
  warmUpIterations: number
}

export interface BenchmarkProgress {
  suiteName: string
  caseIndex: number
  totalCases: number
  libraryName: string
}
