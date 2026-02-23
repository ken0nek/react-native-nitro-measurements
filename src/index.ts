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
  MeasurementResult,
  DimensionalResult,
}

// Step 1: as const satisfies objects — one per category

export const Length = {
  meters: 'meters',
  kilometers: 'kilometers',
  centimeters: 'centimeters',
  millimeters: 'millimeters',
  miles: 'miles',
  yards: 'yards',
  feet: 'feet',
  inches: 'inches',
  nauticalMiles: 'nauticalMiles',
} as const satisfies Record<string, LengthUnit>

export const Mass = {
  kilograms: 'kilograms',
  grams: 'grams',
  milligrams: 'milligrams',
  pounds: 'pounds',
  ounces: 'ounces',
  stones: 'stones',
  metricTons: 'metricTons',
} as const satisfies Record<string, MassUnit>

export const Duration = {
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
} as const satisfies Record<string, DurationUnit>

export const Speed = {
  metersPerSecond: 'metersPerSecond',
  kilometersPerHour: 'kilometersPerHour',
  milesPerHour: 'milesPerHour',
  knots: 'knots',
} as const satisfies Record<string, SpeedUnit>

export const Temperature = {
  celsius: 'celsius',
  fahrenheit: 'fahrenheit',
  kelvin: 'kelvin',
} as const satisfies Record<string, TemperatureUnit>

export const Area = {
  squareMeters: 'squareMeters',
  squareKilometers: 'squareKilometers',
  squareMiles: 'squareMiles',
  squareFeet: 'squareFeet',
  hectares: 'hectares',
  acres: 'acres',
} as const satisfies Record<string, AreaUnit>

export const Volume = {
  liters: 'liters',
  milliliters: 'milliliters',
  gallons: 'gallons',
  cups: 'cups',
  fluidOunces: 'fluidOunces',
  cubicMeters: 'cubicMeters',
} as const satisfies Record<string, VolumeUnit>

export const Energy = {
  joules: 'joules',
  calories: 'calories',
  kilocalories: 'kilocalories',
  kilowattHours: 'kilowattHours',
} as const satisfies Record<string, EnergyUnit>

export const Power = {
  watts: 'watts',
  kilowatts: 'kilowatts',
  horsepower: 'horsepower',
} as const satisfies Record<string, PowerUnit>

export const Frequency = {
  hertz: 'hertz',
  kilohertz: 'kilohertz',
  megahertz: 'megahertz',
  gigahertz: 'gigahertz',
} as const satisfies Record<string, FrequencyUnit>

export const Angle = {
  degrees: 'degrees',
  radians: 'radians',
} as const satisfies Record<string, AngleUnit>

export const Pressure = {
  newtonsPerMetersSquared: 'newtonsPerMetersSquared',
  bars: 'bars',
  millibars: 'millibars',
  atmospheres: 'atmospheres',
  poundsPerSquareInch: 'poundsPerSquareInch',
} as const satisfies Record<string, PressureUnit>

const _module =
  NitroModules.createHybridObject<MeasurementModule>('MeasurementModule')

// Step 2: convert() overloads — one per category

export function convert(value: number, from: LengthUnit, to: LengthUnit): number
export function convert(value: number, from: MassUnit, to: MassUnit): number
export function convert(value: number, from: DurationUnit, to: DurationUnit): number
export function convert(value: number, from: SpeedUnit, to: SpeedUnit): number
export function convert(value: number, from: TemperatureUnit, to: TemperatureUnit): number
export function convert(value: number, from: AreaUnit, to: AreaUnit): number
export function convert(value: number, from: VolumeUnit, to: VolumeUnit): number
export function convert(value: number, from: EnergyUnit, to: EnergyUnit): number
export function convert(value: number, from: PowerUnit, to: PowerUnit): number
export function convert(value: number, from: FrequencyUnit, to: FrequencyUnit): number
export function convert(value: number, from: AngleUnit, to: AngleUnit): number
export function convert(value: number, from: PressureUnit, to: PressureUnit): number
export function convert(value: number, from: AnyUnit, to: AnyUnit): number {
  return _module.convert(value, from, to)
}

export function convertFull(value: number, from: LengthUnit, to: LengthUnit): MeasurementResult
export function convertFull(value: number, from: MassUnit, to: MassUnit): MeasurementResult
export function convertFull(value: number, from: DurationUnit, to: DurationUnit): MeasurementResult
export function convertFull(value: number, from: SpeedUnit, to: SpeedUnit): MeasurementResult
export function convertFull(value: number, from: TemperatureUnit, to: TemperatureUnit): MeasurementResult
export function convertFull(value: number, from: AreaUnit, to: AreaUnit): MeasurementResult
export function convertFull(value: number, from: VolumeUnit, to: VolumeUnit): MeasurementResult
export function convertFull(value: number, from: EnergyUnit, to: EnergyUnit): MeasurementResult
export function convertFull(value: number, from: PowerUnit, to: PowerUnit): MeasurementResult
export function convertFull(value: number, from: FrequencyUnit, to: FrequencyUnit): MeasurementResult
export function convertFull(value: number, from: AngleUnit, to: AngleUnit): MeasurementResult
export function convertFull(value: number, from: PressureUnit, to: PressureUnit): MeasurementResult
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

export function add(valueA: number, unitA: LengthUnit, valueB: number, unitB: LengthUnit, resultUnit: LengthUnit): number
export function add(valueA: number, unitA: MassUnit, valueB: number, unitB: MassUnit, resultUnit: MassUnit): number
export function add(valueA: number, unitA: DurationUnit, valueB: number, unitB: DurationUnit, resultUnit: DurationUnit): number
export function add(valueA: number, unitA: SpeedUnit, valueB: number, unitB: SpeedUnit, resultUnit: SpeedUnit): number
export function add(valueA: number, unitA: TemperatureUnit, valueB: number, unitB: TemperatureUnit, resultUnit: TemperatureUnit): number
export function add(valueA: number, unitA: AreaUnit, valueB: number, unitB: AreaUnit, resultUnit: AreaUnit): number
export function add(valueA: number, unitA: VolumeUnit, valueB: number, unitB: VolumeUnit, resultUnit: VolumeUnit): number
export function add(valueA: number, unitA: EnergyUnit, valueB: number, unitB: EnergyUnit, resultUnit: EnergyUnit): number
export function add(valueA: number, unitA: PowerUnit, valueB: number, unitB: PowerUnit, resultUnit: PowerUnit): number
export function add(valueA: number, unitA: FrequencyUnit, valueB: number, unitB: FrequencyUnit, resultUnit: FrequencyUnit): number
export function add(valueA: number, unitA: AngleUnit, valueB: number, unitB: AngleUnit, resultUnit: AngleUnit): number
export function add(valueA: number, unitA: PressureUnit, valueB: number, unitB: PressureUnit, resultUnit: PressureUnit): number
export function add(
  valueA: number,
  unitA: AnyUnit,
  valueB: number,
  unitB: AnyUnit,
  resultUnit: AnyUnit
): number {
  return _module.add(valueA, unitA, valueB, unitB, resultUnit)
}

export function subtract(valueA: number, unitA: LengthUnit, valueB: number, unitB: LengthUnit, resultUnit: LengthUnit): number
export function subtract(valueA: number, unitA: MassUnit, valueB: number, unitB: MassUnit, resultUnit: MassUnit): number
export function subtract(valueA: number, unitA: DurationUnit, valueB: number, unitB: DurationUnit, resultUnit: DurationUnit): number
export function subtract(valueA: number, unitA: SpeedUnit, valueB: number, unitB: SpeedUnit, resultUnit: SpeedUnit): number
export function subtract(valueA: number, unitA: TemperatureUnit, valueB: number, unitB: TemperatureUnit, resultUnit: TemperatureUnit): number
export function subtract(valueA: number, unitA: AreaUnit, valueB: number, unitB: AreaUnit, resultUnit: AreaUnit): number
export function subtract(valueA: number, unitA: VolumeUnit, valueB: number, unitB: VolumeUnit, resultUnit: VolumeUnit): number
export function subtract(valueA: number, unitA: EnergyUnit, valueB: number, unitB: EnergyUnit, resultUnit: EnergyUnit): number
export function subtract(valueA: number, unitA: PowerUnit, valueB: number, unitB: PowerUnit, resultUnit: PowerUnit): number
export function subtract(valueA: number, unitA: FrequencyUnit, valueB: number, unitB: FrequencyUnit, resultUnit: FrequencyUnit): number
export function subtract(valueA: number, unitA: AngleUnit, valueB: number, unitB: AngleUnit, resultUnit: AngleUnit): number
export function subtract(valueA: number, unitA: PressureUnit, valueB: number, unitB: PressureUnit, resultUnit: PressureUnit): number
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

// Step 3: Fluent measurement() builder

export function measurement<U extends AnyUnit>(value: number, unit: U) {
  return {
    to: (target: U) => _module.convert(value, unit, target),
    toFull: (target: U) => _module.convertFull(value, unit, target),
    add: (otherValue: number, otherUnit: U, resultUnit?: U) =>
      _module.add(value, unit, otherValue, otherUnit, resultUnit ?? unit),
    subtract: (otherValue: number, otherUnit: U, resultUnit?: U) =>
      _module.subtract(value, unit, otherValue, otherUnit, resultUnit ?? unit),
    times: (otherValue: number, otherUnit: AnyUnit) =>
      _module.multiply(value, unit, otherValue, otherUnit),
    dividedBy: (otherValue: number, otherUnit: AnyUnit) =>
      _module.divide(value, unit, otherValue, otherUnit),
    symbol: () => _module.getSymbol(unit),
  }
}

export { _module as MeasurementModule }
