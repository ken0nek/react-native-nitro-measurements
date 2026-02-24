import type { BenchmarkSuite } from '../types'
import type { ConversionAdapter } from '../types'

export function createSimpleConversionSuite(adapters: ConversionAdapter[]): BenchmarkSuite {
  return {
    name: 'Simple Conversion',
    cases: [
      {
        name: '24 hours → minutes',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(24, 'hours', 'minutes'),
          expected: 1440,
        })),
      },
      {
        name: '4 inches → millimeters',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(4, 'inches', 'millimeters'),
          expected: 101.6,
        })),
      },
      {
        name: '2.5 liters → cubic inches',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(2.5, 'liters', 'cubicInches'),
          expected: 152.587,
        })),
      },
    ],
  }
}
