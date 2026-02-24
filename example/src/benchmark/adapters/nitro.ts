import { convert, add, subtract } from 'react-native-nitro-measurements'
import type { AnyUnit } from 'react-native-nitro-measurements'
import type { ConversionAdapter } from '../types'

export const nitroAdapter: ConversionAdapter = {
  name: 'nitro-measurements',
  convert: (value: number, from: string, to: string) =>
    convert(value, from as AnyUnit, to as AnyUnit),
  add: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) =>
    add(valueA, unitA as AnyUnit, valueB, unitB as AnyUnit, resultUnit as AnyUnit),
  subtract: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) =>
    subtract(valueA, unitA as AnyUnit, valueB, unitB as AnyUnit, resultUnit as AnyUnit),
}
