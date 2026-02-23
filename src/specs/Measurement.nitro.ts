import { type HybridObject } from 'react-native-nitro-modules'
import type { AnyUnit } from './Units.nitro'

export interface MeasurementModule
  extends HybridObject<{ ios: 'swift' }> {
  convert(value: number, from: AnyUnit, to: AnyUnit): number
}
