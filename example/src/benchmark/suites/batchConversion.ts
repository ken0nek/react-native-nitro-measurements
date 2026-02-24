import type { BenchmarkSuite, ConversionAdapter } from '../types'

export function createBatchConversionSuite(adapters: ConversionAdapter[]): BenchmarkSuite {
  return {
    name: 'Batch Conversion',
    cases: [
      {
        name: 'km→mi × 100',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => {
            let result = 0
            for (let i = 0; i < 100; i++) {
              result = adapter.convert(100, 'kilometers', 'miles')
            }
            return result
          },
          expected: 62.1371,
        })),
      },
      {
        name: 'km→mi × 1000',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => {
            let result = 0
            for (let i = 0; i < 1000; i++) {
              result = adapter.convert(100, 'kilometers', 'miles')
            }
            return result
          },
          expected: 62.1371,
        })),
      },
    ],
  }
}
