import type { BenchmarkSuite, ConversionAdapter } from '../types'

export function createTemperatureSuite(adapters: ConversionAdapter[]): BenchmarkSuite {
  return {
    name: 'Temperature (Non-linear)',
    cases: [
      {
        name: '100°C → °F',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(100, 'celsius', 'fahrenheit'),
          expected: 212,
        })),
      },
      {
        name: '451°F → °C',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(451, 'fahrenheit', 'celsius'),
          expected: 232.778,
        })),
      },
      {
        name: '0 K → °C',
        adapters: adapters.map((adapter) => ({
          adapter,
          fn: () => adapter.convert(0, 'kelvin', 'celsius'),
          expected: -273.15,
        })),
      },
    ],
  }
}
