import type { BenchmarkSuite, ConversionAdapter } from '../types'

export function createArithmeticSuite(adapters: ConversionAdapter[]): BenchmarkSuite {
  // Only include adapters that support add/subtract
  const withArithmetic = adapters.filter((a) => a.add && a.subtract)

  return {
    name: 'Arithmetic',
    cases: [
      {
        name: '1 km + 500 m → meters',
        adapters: withArithmetic.map((adapter) => ({
          adapter,
          fn: () => adapter.add!(1, 'kilometers', 500, 'meters', 'meters'),
          expected: 1500,
        })),
      },
      {
        name: '10 lb − 3 kg → pounds',
        adapters: withArithmetic.map((adapter) => ({
          adapter,
          fn: () => adapter.subtract!(10, 'pounds', 3, 'kilograms', 'pounds'),
          expected: 3.38582,
        })),
      },
    ],
  }
}
