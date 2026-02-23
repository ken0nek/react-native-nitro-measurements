import { NitroModules } from 'react-native-nitro-modules'
import type { MeasurementModule, MeasurementResult, DimensionalResult } from './specs/Measurement.nitro'
import type {
  LengthUnit,
  MassUnit,
  DurationUnit,
  SpeedUnit,
  TemperatureUnit,
  AreaUnit,
  VolumeUnit,
  EnergyUnit,
  PowerUnit,
  FrequencyUnit,
  AngleUnit,
  PressureUnit,
  AnyUnit,
  UnitCategory,
} from './specs/Units.nitro'

export type {
  LengthUnit,
  MassUnit,
  DurationUnit,
  SpeedUnit,
  TemperatureUnit,
  AreaUnit,
  VolumeUnit,
  EnergyUnit,
  PowerUnit,
  FrequencyUnit,
  AngleUnit,
  PressureUnit,
  AnyUnit,
  UnitCategory,
  MeasurementModule,
  MeasurementResult,
  DimensionalResult,
}

const _module =
  NitroModules.createHybridObject<MeasurementModule>('MeasurementModule')

export function convert(
  value: number,
  from: AnyUnit,
  to: AnyUnit
): number {
  return _module.convert(value, from, to)
}

export function convertFull(
  value: number,
  from: AnyUnit,
  to: AnyUnit
): MeasurementResult {
  return _module.convertFull(value, from, to)
}

export function getSymbol(unit: AnyUnit): string {
  return _module.getSymbol(unit)
}

export function getUnitsForCategory(category: UnitCategory): AnyUnit[] {
  return _module.getUnitsForCategory(category)
}

export function getCategories(): UnitCategory[] {
  return _module.getCategories()
}

export function add(
  valueA: number,
  unitA: AnyUnit,
  valueB: number,
  unitB: AnyUnit,
  resultUnit: AnyUnit
): number {
  return _module.add(valueA, unitA, valueB, unitB, resultUnit)
}

export function subtract(
  valueA: number,
  unitA: AnyUnit,
  valueB: number,
  unitB: AnyUnit,
  resultUnit: AnyUnit
): number {
  return _module.subtract(valueA, unitA, valueB, unitB, resultUnit)
}

export function multiply(
  valueA: number,
  unitA: AnyUnit,
  valueB: number,
  unitB: AnyUnit
): DimensionalResult {
  return _module.multiply(valueA, unitA, valueB, unitB)
}

export function divide(
  valueA: number,
  unitA: AnyUnit,
  valueB: number,
  unitB: AnyUnit
): DimensionalResult {
  return _module.divide(valueA, unitA, valueB, unitB)
}

export function resolveDimension(
  value: number,
  dimensions: number[],
  targetUnit: AnyUnit
): MeasurementResult | undefined {
  return _module.resolveDimension(value, dimensions, targetUnit)
}

export { _module as MeasurementModule }
