import { NitroModules } from 'react-native-nitro-modules'
import type { MeasurementModule } from './specs/Measurement.nitro'
import type { LengthUnit, AnyUnit } from './specs/Units.nitro'

export type { LengthUnit, AnyUnit, MeasurementModule }

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
