import { NitroModules } from 'react-native-nitro-modules'
import type { MeasurementModule, MeasurementResult } from './specs/Measurement.nitro'
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

export { _module as MeasurementModule }
