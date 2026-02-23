import { type HybridObject } from 'react-native-nitro-modules'
import type { AnyUnit, UnitCategory } from './Units.nitro'

export interface MeasurementResult {
  value: number
  unit: AnyUnit
  category: UnitCategory
  symbol: string
}

export interface DimensionalResult {
  value: number
  dimensions: number[]
  dimensionLabel: string
}

export interface MeasurementModule
  extends HybridObject<{ ios: 'swift' }> {
  convert(value: number, from: AnyUnit, to: AnyUnit): number
  convertFull(value: number, from: AnyUnit, to: AnyUnit): MeasurementResult
  getSymbol(unit: AnyUnit): string
  getUnitsForCategory(category: UnitCategory): AnyUnit[]
  getCategories(): UnitCategory[]
  add(valueA: number, unitA: AnyUnit, valueB: number, unitB: AnyUnit, resultUnit: AnyUnit): number
  subtract(valueA: number, unitA: AnyUnit, valueB: number, unitB: AnyUnit, resultUnit: AnyUnit): number
  multiply(valueA: number, unitA: AnyUnit, valueB: number, unitB: AnyUnit): DimensionalResult
  divide(valueA: number, unitA: AnyUnit, valueB: number, unitB: AnyUnit): DimensionalResult
  resolveDimension(value: number, dimensions: number[], targetUnit: AnyUnit): MeasurementResult | undefined
}
