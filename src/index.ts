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
  AccelerationUnit,
  ConcentrationMassUnit,
  DispersionUnit,
  ElectricChargeUnit,
  ElectricCurrentUnit,
  ElectricPotentialDifferenceUnit,
  ElectricResistanceUnit,
  FuelEfficiencyUnit,
  IlluminanceUnit,
  InformationStorageUnit,
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
  AccelerationUnit,
  ConcentrationMassUnit,
  DispersionUnit,
  ElectricChargeUnit,
  ElectricCurrentUnit,
  ElectricPotentialDifferenceUnit,
  ElectricResistanceUnit,
  FuelEfficiencyUnit,
  IlluminanceUnit,
  InformationStorageUnit,
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
  micrometers: 'micrometers',
  nanometers: 'nanometers',
  picometers: 'picometers',
  megameters: 'megameters',
  hectometers: 'hectometers',
  decameters: 'decameters',
  decimeters: 'decimeters',
  scandinavianMiles: 'scandinavianMiles',
  lightyears: 'lightyears',
  fathoms: 'fathoms',
  furlongs: 'furlongs',
  astronomicalUnits: 'astronomicalUnits',
  parsecs: 'parsecs',
} as const satisfies Record<string, LengthUnit>

export const Mass = {
  kilograms: 'kilograms',
  grams: 'grams',
  milligrams: 'milligrams',
  pounds: 'pounds',
  ounces: 'ounces',
  stones: 'stones',
  metricTons: 'metricTons',
  decigrams: 'decigrams',
  centigrams: 'centigrams',
  micrograms: 'micrograms',
  nanograms: 'nanograms',
  picograms: 'picograms',
  shortTons: 'shortTons',
  carats: 'carats',
  ouncesTroy: 'ouncesTroy',
  slugs: 'slugs',
} as const satisfies Record<string, MassUnit>

export const Duration = {
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
  milliseconds: 'milliseconds',
  microseconds: 'microseconds',
  nanoseconds: 'nanoseconds',
  picoseconds: 'picoseconds',
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
  squareMegameters: 'squareMegameters',
  squareCentimeters: 'squareCentimeters',
  squareMillimeters: 'squareMillimeters',
  squareMicrometers: 'squareMicrometers',
  squareNanometers: 'squareNanometers',
  squareInches: 'squareInches',
  squareYards: 'squareYards',
  ares: 'ares',
} as const satisfies Record<string, AreaUnit>

export const Volume = {
  liters: 'liters',
  milliliters: 'milliliters',
  gallons: 'gallons',
  cups: 'cups',
  fluidOunces: 'fluidOunces',
  cubicMeters: 'cubicMeters',
  megaliters: 'megaliters',
  kiloliters: 'kiloliters',
  deciliters: 'deciliters',
  centiliters: 'centiliters',
  cubicKilometers: 'cubicKilometers',
  cubicDecimeters: 'cubicDecimeters',
  cubicCentimeters: 'cubicCentimeters',
  cubicMillimeters: 'cubicMillimeters',
  cubicInches: 'cubicInches',
  cubicFeet: 'cubicFeet',
  cubicYards: 'cubicYards',
  cubicMiles: 'cubicMiles',
  acreFeet: 'acreFeet',
  bushels: 'bushels',
  teaspoons: 'teaspoons',
  tablespoons: 'tablespoons',
  pints: 'pints',
  quarts: 'quarts',
  imperialTeaspoons: 'imperialTeaspoons',
  imperialTablespoons: 'imperialTablespoons',
  imperialFluidOunces: 'imperialFluidOunces',
  imperialPints: 'imperialPints',
  imperialQuarts: 'imperialQuarts',
  imperialGallons: 'imperialGallons',
  metricCups: 'metricCups',
} as const satisfies Record<string, VolumeUnit>

export const Energy = {
  joules: 'joules',
  calories: 'calories',
  kilocalories: 'kilocalories',
  kilowattHours: 'kilowattHours',
  kilojoules: 'kilojoules',
} as const satisfies Record<string, EnergyUnit>

export const Power = {
  watts: 'watts',
  kilowatts: 'kilowatts',
  horsepower: 'horsepower',
  terawatts: 'terawatts',
  gigawatts: 'gigawatts',
  megawatts: 'megawatts',
  milliwatts: 'milliwatts',
  microwatts: 'microwatts',
  nanowatts: 'nanowatts',
  picowatts: 'picowatts',
  femtowatts: 'femtowatts',
} as const satisfies Record<string, PowerUnit>

export const Frequency = {
  hertz: 'hertz',
  kilohertz: 'kilohertz',
  megahertz: 'megahertz',
  gigahertz: 'gigahertz',
  terahertz: 'terahertz',
  millihertz: 'millihertz',
  microhertz: 'microhertz',
  nanohertz: 'nanohertz',
} as const satisfies Record<string, FrequencyUnit>

export const Angle = {
  degrees: 'degrees',
  radians: 'radians',
  arcMinutes: 'arcMinutes',
  arcSeconds: 'arcSeconds',
  gradians: 'gradians',
  revolutions: 'revolutions',
} as const satisfies Record<string, AngleUnit>

export const Pressure = {
  newtonsPerMetersSquared: 'newtonsPerMetersSquared',
  bars: 'bars',
  millibars: 'millibars',
  atmospheres: 'atmospheres',
  poundsPerSquareInch: 'poundsPerSquareInch',
  gigapascals: 'gigapascals',
  megapascals: 'megapascals',
  kilopascals: 'kilopascals',
  hectopascals: 'hectopascals',
  inchesOfMercury: 'inchesOfMercury',
  millimetersOfMercury: 'millimetersOfMercury',
} as const satisfies Record<string, PressureUnit>

export const Acceleration = {
  metersPerSecondSquared: 'metersPerSecondSquared',
  gravity: 'gravity',
} as const satisfies Record<string, AccelerationUnit>

export const ConcentrationMass = {
  gramsPerLiter: 'gramsPerLiter',
  milligramsPerDeciliter: 'milligramsPerDeciliter',
} as const satisfies Record<string, ConcentrationMassUnit>

export const Dispersion = {
  partsPerMillion: 'partsPerMillion',
} as const satisfies Record<string, DispersionUnit>

export const ElectricCharge = {
  coulombs: 'coulombs',
  megaampereHours: 'megaampereHours',
  kiloampereHours: 'kiloampereHours',
  ampereHours: 'ampereHours',
  milliampereHours: 'milliampereHours',
  microampereHours: 'microampereHours',
} as const satisfies Record<string, ElectricChargeUnit>

export const ElectricCurrent = {
  megaamperes: 'megaamperes',
  kiloamperes: 'kiloamperes',
  amperes: 'amperes',
  milliamperes: 'milliamperes',
  microamperes: 'microamperes',
} as const satisfies Record<string, ElectricCurrentUnit>

export const ElectricPotentialDifference = {
  megavolts: 'megavolts',
  kilovolts: 'kilovolts',
  volts: 'volts',
  millivolts: 'millivolts',
  microvolts: 'microvolts',
} as const satisfies Record<string, ElectricPotentialDifferenceUnit>

export const ElectricResistance = {
  megaohms: 'megaohms',
  kiloohms: 'kiloohms',
  ohms: 'ohms',
  milliohms: 'milliohms',
  microohms: 'microohms',
} as const satisfies Record<string, ElectricResistanceUnit>

export const FuelEfficiency = {
  litersPer100Kilometers: 'litersPer100Kilometers',
  milesPerImperialGallon: 'milesPerImperialGallon',
  milesPerGallon: 'milesPerGallon',
} as const satisfies Record<string, FuelEfficiencyUnit>

export const Illuminance = {
  lux: 'lux',
} as const satisfies Record<string, IlluminanceUnit>

export const InformationStorage = {
  bytes: 'bytes',
  bits: 'bits',
  nibbles: 'nibbles',
  yottabytes: 'yottabytes',
  zettabytes: 'zettabytes',
  exabytes: 'exabytes',
  petabytes: 'petabytes',
  terabytes: 'terabytes',
  gigabytes: 'gigabytes',
  megabytes: 'megabytes',
  kilobytes: 'kilobytes',
  yottabits: 'yottabits',
  zettabits: 'zettabits',
  exabits: 'exabits',
  petabits: 'petabits',
  terabits: 'terabits',
  gigabits: 'gigabits',
  megabits: 'megabits',
  kilobits: 'kilobits',
  yobibytes: 'yobibytes',
  zebibytes: 'zebibytes',
  exbibytes: 'exbibytes',
  pebibytes: 'pebibytes',
  tebibytes: 'tebibytes',
  gibibytes: 'gibibytes',
  mebibytes: 'mebibytes',
  kibibytes: 'kibibytes',
  yobibits: 'yobibits',
  zebibits: 'zebibits',
  exbibits: 'exbibits',
  pebibits: 'pebibits',
  tebibits: 'tebibits',
  gibibits: 'gibibits',
  mebibits: 'mebibits',
  kibibits: 'kibibits',
} as const satisfies Record<string, InformationStorageUnit>

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
export function convert(value: number, from: AccelerationUnit, to: AccelerationUnit): number
export function convert(value: number, from: ConcentrationMassUnit, to: ConcentrationMassUnit): number
export function convert(value: number, from: DispersionUnit, to: DispersionUnit): number
export function convert(value: number, from: ElectricChargeUnit, to: ElectricChargeUnit): number
export function convert(value: number, from: ElectricCurrentUnit, to: ElectricCurrentUnit): number
export function convert(value: number, from: ElectricPotentialDifferenceUnit, to: ElectricPotentialDifferenceUnit): number
export function convert(value: number, from: ElectricResistanceUnit, to: ElectricResistanceUnit): number
export function convert(value: number, from: FuelEfficiencyUnit, to: FuelEfficiencyUnit): number
export function convert(value: number, from: IlluminanceUnit, to: IlluminanceUnit): number
export function convert(value: number, from: InformationStorageUnit, to: InformationStorageUnit): number
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
export function convertFull(value: number, from: AccelerationUnit, to: AccelerationUnit): MeasurementResult
export function convertFull(value: number, from: ConcentrationMassUnit, to: ConcentrationMassUnit): MeasurementResult
export function convertFull(value: number, from: DispersionUnit, to: DispersionUnit): MeasurementResult
export function convertFull(value: number, from: ElectricChargeUnit, to: ElectricChargeUnit): MeasurementResult
export function convertFull(value: number, from: ElectricCurrentUnit, to: ElectricCurrentUnit): MeasurementResult
export function convertFull(value: number, from: ElectricPotentialDifferenceUnit, to: ElectricPotentialDifferenceUnit): MeasurementResult
export function convertFull(value: number, from: ElectricResistanceUnit, to: ElectricResistanceUnit): MeasurementResult
export function convertFull(value: number, from: FuelEfficiencyUnit, to: FuelEfficiencyUnit): MeasurementResult
export function convertFull(value: number, from: IlluminanceUnit, to: IlluminanceUnit): MeasurementResult
export function convertFull(value: number, from: InformationStorageUnit, to: InformationStorageUnit): MeasurementResult
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
export function add(valueA: number, unitA: AccelerationUnit, valueB: number, unitB: AccelerationUnit, resultUnit: AccelerationUnit): number
export function add(valueA: number, unitA: ConcentrationMassUnit, valueB: number, unitB: ConcentrationMassUnit, resultUnit: ConcentrationMassUnit): number
export function add(valueA: number, unitA: DispersionUnit, valueB: number, unitB: DispersionUnit, resultUnit: DispersionUnit): number
export function add(valueA: number, unitA: ElectricChargeUnit, valueB: number, unitB: ElectricChargeUnit, resultUnit: ElectricChargeUnit): number
export function add(valueA: number, unitA: ElectricCurrentUnit, valueB: number, unitB: ElectricCurrentUnit, resultUnit: ElectricCurrentUnit): number
export function add(valueA: number, unitA: ElectricPotentialDifferenceUnit, valueB: number, unitB: ElectricPotentialDifferenceUnit, resultUnit: ElectricPotentialDifferenceUnit): number
export function add(valueA: number, unitA: ElectricResistanceUnit, valueB: number, unitB: ElectricResistanceUnit, resultUnit: ElectricResistanceUnit): number
export function add(valueA: number, unitA: FuelEfficiencyUnit, valueB: number, unitB: FuelEfficiencyUnit, resultUnit: FuelEfficiencyUnit): number
export function add(valueA: number, unitA: IlluminanceUnit, valueB: number, unitB: IlluminanceUnit, resultUnit: IlluminanceUnit): number
export function add(valueA: number, unitA: InformationStorageUnit, valueB: number, unitB: InformationStorageUnit, resultUnit: InformationStorageUnit): number
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
export function subtract(valueA: number, unitA: AccelerationUnit, valueB: number, unitB: AccelerationUnit, resultUnit: AccelerationUnit): number
export function subtract(valueA: number, unitA: ConcentrationMassUnit, valueB: number, unitB: ConcentrationMassUnit, resultUnit: ConcentrationMassUnit): number
export function subtract(valueA: number, unitA: DispersionUnit, valueB: number, unitB: DispersionUnit, resultUnit: DispersionUnit): number
export function subtract(valueA: number, unitA: ElectricChargeUnit, valueB: number, unitB: ElectricChargeUnit, resultUnit: ElectricChargeUnit): number
export function subtract(valueA: number, unitA: ElectricCurrentUnit, valueB: number, unitB: ElectricCurrentUnit, resultUnit: ElectricCurrentUnit): number
export function subtract(valueA: number, unitA: ElectricPotentialDifferenceUnit, valueB: number, unitB: ElectricPotentialDifferenceUnit, resultUnit: ElectricPotentialDifferenceUnit): number
export function subtract(valueA: number, unitA: ElectricResistanceUnit, valueB: number, unitB: ElectricResistanceUnit, resultUnit: ElectricResistanceUnit): number
export function subtract(valueA: number, unitA: FuelEfficiencyUnit, valueB: number, unitB: FuelEfficiencyUnit, resultUnit: FuelEfficiencyUnit): number
export function subtract(valueA: number, unitA: IlluminanceUnit, valueB: number, unitB: IlluminanceUnit, resultUnit: IlluminanceUnit): number
export function subtract(valueA: number, unitA: InformationStorageUnit, valueB: number, unitB: InformationStorageUnit, resultUnit: InformationStorageUnit): number
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
