import { NitroModules } from 'react-native-nitro-modules'
import type { MeasurementModule } from './specs/Measurement.nitro'
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

export { _module as MeasurementModule }
