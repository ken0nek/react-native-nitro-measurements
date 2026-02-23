export type LengthUnit =
  | 'meters'
  | 'kilometers'
  | 'centimeters'
  | 'millimeters'
  | 'miles'
  | 'yards'
  | 'feet'
  | 'inches'
  | 'nauticalMiles'
  | 'micrometers'
  | 'nanometers'
  | 'picometers'
  | 'megameters'
  | 'hectometers'
  | 'decameters'
  | 'decimeters'
  | 'scandinavianMiles'
  | 'lightyears'
  | 'fathoms'
  | 'furlongs'
  | 'astronomicalUnits'
  | 'parsecs'

export type MassUnit =
  | 'kilograms'
  | 'grams'
  | 'milligrams'
  | 'pounds'
  | 'ounces'
  | 'stones'
  | 'metricTons'
  | 'decigrams'
  | 'centigrams'
  | 'micrograms'
  | 'nanograms'
  | 'picograms'
  | 'shortTons'
  | 'carats'
  | 'ouncesTroy'
  | 'slugs'

export type DurationUnit =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'milliseconds'
  | 'microseconds'
  | 'nanoseconds'
  | 'picoseconds'

export type SpeedUnit =
  | 'metersPerSecond'
  | 'kilometersPerHour'
  | 'milesPerHour'
  | 'knots'

export type TemperatureUnit =
  | 'celsius'
  | 'fahrenheit'
  | 'kelvin'

export type AreaUnit =
  | 'squareMeters'
  | 'squareKilometers'
  | 'squareMiles'
  | 'squareFeet'
  | 'hectares'
  | 'acres'
  | 'squareMegameters'
  | 'squareCentimeters'
  | 'squareMillimeters'
  | 'squareMicrometers'
  | 'squareNanometers'
  | 'squareInches'
  | 'squareYards'
  | 'ares'

export type VolumeUnit =
  | 'liters'
  | 'milliliters'
  | 'gallons'
  | 'cups'
  | 'fluidOunces'
  | 'cubicMeters'
  | 'megaliters'
  | 'kiloliters'
  | 'deciliters'
  | 'centiliters'
  | 'cubicKilometers'
  | 'cubicDecimeters'
  | 'cubicCentimeters'
  | 'cubicMillimeters'
  | 'cubicInches'
  | 'cubicFeet'
  | 'cubicYards'
  | 'cubicMiles'
  | 'acreFeet'
  | 'bushels'
  | 'teaspoons'
  | 'tablespoons'
  | 'pints'
  | 'quarts'
  | 'imperialTeaspoons'
  | 'imperialTablespoons'
  | 'imperialFluidOunces'
  | 'imperialPints'
  | 'imperialQuarts'
  | 'imperialGallons'
  | 'metricCups'

export type EnergyUnit =
  | 'joules'
  | 'calories'
  | 'kilocalories'
  | 'kilowattHours'
  | 'kilojoules'

export type PowerUnit =
  | 'watts'
  | 'kilowatts'
  | 'horsepower'
  | 'terawatts'
  | 'gigawatts'
  | 'megawatts'
  | 'milliwatts'
  | 'microwatts'
  | 'nanowatts'
  | 'picowatts'
  | 'femtowatts'

export type FrequencyUnit =
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'millihertz'
  | 'microhertz'
  | 'nanohertz'

export type AngleUnit =
  | 'degrees'
  | 'radians'
  | 'arcMinutes'
  | 'arcSeconds'
  | 'gradians'
  | 'revolutions'

export type PressureUnit =
  | 'newtonsPerMetersSquared'
  | 'bars'
  | 'millibars'
  | 'atmospheres'
  | 'poundsPerSquareInch'
  | 'gigapascals'
  | 'megapascals'
  | 'kilopascals'
  | 'hectopascals'
  | 'inchesOfMercury'
  | 'millimetersOfMercury'

export type AnyUnit =
  | LengthUnit
  | MassUnit
  | DurationUnit
  | SpeedUnit
  | TemperatureUnit
  | AreaUnit
  | VolumeUnit
  | EnergyUnit
  | PowerUnit
  | FrequencyUnit
  | AngleUnit
  | PressureUnit

export type UnitCategory =
  | 'length'
  | 'mass'
  | 'duration'
  | 'speed'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'energy'
  | 'power'
  | 'frequency'
  | 'angle'
  | 'pressure'
