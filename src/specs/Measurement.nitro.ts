import { type HybridObject } from 'react-native-nitro-modules'
import type { AnyUnit, UnitCategory } from './Units.nitro'

export interface MeasurementResult {
  value: number
  unit: AnyUnit
  category: UnitCategory
  symbol: string
}

export interface MeasurementModule
  extends HybridObject<{ ios: 'swift' }> {
  convert(value: number, from: AnyUnit, to: AnyUnit): number
  convertFull(value: number, from: AnyUnit, to: AnyUnit): MeasurementResult
  getSymbol(unit: AnyUnit): string
  getUnitsForCategory(category: UnitCategory): AnyUnit[]
  getCategories(): UnitCategory[]
}
