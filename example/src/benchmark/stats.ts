import type { BenchmarkStats } from './types'

export function computeStats(timings: Float64Array, iterations: number): BenchmarkStats {
  const sorted = new Float64Array(timings).sort()
  const n = sorted.length

  const median = percentile(sorted, 0.5)
  const p95 = percentile(sorted, 0.95)
  const min = sorted[0]!
  const max = sorted[n - 1]!

  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += sorted[i]!
  }
  const mean = sum / n

  // Trimmed mean: remove top/bottom 1%
  const trimLow = Math.floor(n * 0.01)
  const trimHigh = n - trimLow
  let trimmedSum = 0
  let trimmedCount = 0
  for (let i = trimLow; i < trimHigh; i++) {
    trimmedSum += sorted[i]!
    trimmedCount++
  }
  const trimmedMean = trimmedCount > 0 ? trimmedSum / trimmedCount : mean

  // Standard deviation
  let sqDiffSum = 0
  for (let i = 0; i < n; i++) {
    const diff = sorted[i]! - mean
    sqDiffSum += diff * diff
  }
  const stdDev = Math.sqrt(sqDiffSum / n)

  // ops/sec: median is in ms, so ops/sec = 1000 / median
  const opsPerSec = median > 0 ? 1000 / median : Infinity

  return { median, mean, min, max, p95, stdDev, opsPerSec, trimmedMean, iterations }
}

function percentile(sorted: Float64Array, p: number): number {
  const n = sorted.length
  if (n === 0) return 0
  if (n === 1) return sorted[0]!
  const idx = p * (n - 1)
  const lower = Math.floor(idx)
  const upper = Math.ceil(idx)
  if (lower === upper) return sorted[lower]!
  const frac = idx - lower
  return sorted[lower]! * (1 - frac) + sorted[upper]! * frac
}
