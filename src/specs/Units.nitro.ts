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

export type MassUnit =
  | 'kilograms'
  | 'grams'
  | 'milligrams'
  | 'pounds'
  | 'ounces'
  | 'stones'
  | 'metricTons'

export type DurationUnit =
  | 'seconds'
  | 'minutes'
  | 'hours'

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

export type VolumeUnit =
  | 'liters'
  | 'milliliters'
  | 'gallons'
  | 'cups'
  | 'fluidOunces'
  | 'cubicMeters'

export type EnergyUnit =
  | 'joules'
  | 'calories'
  | 'kilocalories'
  | 'kilowattHours'

export type PowerUnit =
  | 'watts'
  | 'kilowatts'
  | 'horsepower'

export type FrequencyUnit =
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'

export type AngleUnit =
  | 'degrees'
  | 'radians'

export type PressureUnit =
  | 'newtonsPerMetersSquared'
  | 'bars'
  | 'millibars'
  | 'atmospheres'
  | 'poundsPerSquareInch'

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
