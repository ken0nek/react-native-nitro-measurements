/**
 * Type-level tests — verified by `tsc --noEmit`, not a test runner.
 *
 * Lines with `@ts-expect-error` MUST produce a compile error.
 * All other lines MUST compile without errors.
 *
 * 144 valid compile lines · 22 @ts-expect-error lines · 138 units exercised
 */

import {
  convert,
  convertFull,
  add,
  subtract,
  multiply,
  divide,
  resolveDimension,
  getSymbol,
  getUnitsForCategory,
  getCategories,
  measurement,
  Length,
  Mass,
  Duration,
  Speed,
  Temperature,
  Area,
  Volume,
  Energy,
  Power,
  Frequency,
  Angle,
  Pressure,
  type LengthUnit,
  type MassUnit,
  type DurationUnit,
  type SpeedUnit,
  type TemperatureUnit,
  type AreaUnit,
  type VolumeUnit,
  type EnergyUnit,
  type PowerUnit,
  type FrequencyUnit,
  type AngleUnit,
  type PressureUnit,
  type AnyUnit,
  type UnitCategory,
  type MeasurementResult,
  type DimensionalResult,
} from '..'

// ━━━ Section 1: Exhaustive const object coverage (72 convert() calls) ━━━
// Every unit from every const object appears at least once, proving each
// string literal is a valid member of its category type.

// Length (22 units → 11 calls)
convert(1, Length.meters, Length.kilometers)
convert(1, Length.centimeters, Length.millimeters)
convert(1, Length.miles, Length.yards)
convert(1, Length.feet, Length.inches)
convert(1, Length.nauticalMiles, Length.micrometers)
convert(1, Length.nanometers, Length.picometers)
convert(1, Length.megameters, Length.hectometers)
convert(1, Length.decameters, Length.decimeters)
convert(1, Length.scandinavianMiles, Length.lightyears)
convert(1, Length.fathoms, Length.furlongs)
convert(1, Length.astronomicalUnits, Length.parsecs)

// Mass (16 units → 8 calls)
convert(1, Mass.kilograms, Mass.grams)
convert(1, Mass.milligrams, Mass.pounds)
convert(1, Mass.ounces, Mass.stones)
convert(1, Mass.metricTons, Mass.decigrams)
convert(1, Mass.centigrams, Mass.micrograms)
convert(1, Mass.nanograms, Mass.picograms)
convert(1, Mass.shortTons, Mass.carats)
convert(1, Mass.ouncesTroy, Mass.slugs)

// Duration (7 units → 4 calls)
convert(1, Duration.seconds, Duration.minutes)
convert(1, Duration.hours, Duration.milliseconds)
convert(1, Duration.microseconds, Duration.nanoseconds)
convert(1, Duration.picoseconds, Duration.seconds)

// Speed (4 units → 2 calls)
convert(1, Speed.metersPerSecond, Speed.kilometersPerHour)
convert(1, Speed.milesPerHour, Speed.knots)

// Temperature (3 units → 2 calls)
convert(0, Temperature.celsius, Temperature.fahrenheit)
convert(0, Temperature.kelvin, Temperature.celsius)

// Area (14 units → 7 calls)
convert(1, Area.squareMeters, Area.squareKilometers)
convert(1, Area.squareMiles, Area.squareFeet)
convert(1, Area.hectares, Area.acres)
convert(1, Area.squareMegameters, Area.squareCentimeters)
convert(1, Area.squareMillimeters, Area.squareMicrometers)
convert(1, Area.squareNanometers, Area.squareInches)
convert(1, Area.squareYards, Area.ares)

// Volume (31 units → 16 calls)
convert(1, Volume.liters, Volume.milliliters)
convert(1, Volume.gallons, Volume.cups)
convert(1, Volume.fluidOunces, Volume.cubicMeters)
convert(1, Volume.megaliters, Volume.kiloliters)
convert(1, Volume.deciliters, Volume.centiliters)
convert(1, Volume.cubicKilometers, Volume.cubicDecimeters)
convert(1, Volume.cubicCentimeters, Volume.cubicMillimeters)
convert(1, Volume.cubicInches, Volume.cubicFeet)
convert(1, Volume.cubicYards, Volume.cubicMiles)
convert(1, Volume.acreFeet, Volume.bushels)
convert(1, Volume.teaspoons, Volume.tablespoons)
convert(1, Volume.pints, Volume.quarts)
convert(1, Volume.imperialTeaspoons, Volume.imperialTablespoons)
convert(1, Volume.imperialFluidOunces, Volume.imperialPints)
convert(1, Volume.imperialQuarts, Volume.imperialGallons)
convert(1, Volume.metricCups, Volume.liters)

// Energy (5 units → 3 calls)
convert(1, Energy.joules, Energy.calories)
convert(1, Energy.kilocalories, Energy.kilowattHours)
convert(1, Energy.kilojoules, Energy.joules)

// Power (11 units → 6 calls)
convert(1, Power.watts, Power.kilowatts)
convert(1, Power.horsepower, Power.terawatts)
convert(1, Power.gigawatts, Power.megawatts)
convert(1, Power.milliwatts, Power.microwatts)
convert(1, Power.nanowatts, Power.picowatts)
convert(1, Power.femtowatts, Power.watts)

// Frequency (8 units → 4 calls)
convert(1, Frequency.hertz, Frequency.kilohertz)
convert(1, Frequency.megahertz, Frequency.gigahertz)
convert(1, Frequency.terahertz, Frequency.millihertz)
convert(1, Frequency.microhertz, Frequency.nanohertz)

// Angle (6 units → 3 calls)
convert(1, Angle.degrees, Angle.radians)
convert(1, Angle.arcMinutes, Angle.arcSeconds)
convert(1, Angle.gradians, Angle.revolutions)

// Pressure (11 units → 6 calls)
convert(1, Pressure.newtonsPerMetersSquared, Pressure.bars)
convert(1, Pressure.millibars, Pressure.atmospheres)
convert(1, Pressure.poundsPerSquareInch, Pressure.gigapascals)
convert(1, Pressure.megapascals, Pressure.kilopascals)
convert(1, Pressure.hectopascals, Pressure.inchesOfMercury)
convert(1, Pressure.millimetersOfMercury, Pressure.newtonsPerMetersSquared)

// ━━━ Section 2: String literal validation for M8a units (10 calls) ━━━
// Raw string literals prove the union types include M8a expansion strings.

convert(1, 'parsecs', 'lightyears')
convert(1, 'slugs', 'carats')
convert(1, 'picoseconds', 'nanoseconds')
convert(1, 'squareMegameters', 'ares')
convert(1, 'imperialGallons', 'metricCups')
convert(1, 'kilojoules', 'kilocalories')
convert(1, 'femtowatts', 'nanowatts')
convert(1, 'nanohertz', 'microhertz')
convert(1, 'gradians', 'revolutions')
convert(1, 'millimetersOfMercury', 'hectopascals')

// ━━━ Section 3: convertFull() — all 12 categories (12 calls) ━━━

convertFull(1, Length.meters, Length.feet)
convertFull(1, Mass.kilograms, Mass.pounds)
convertFull(1, Duration.seconds, Duration.minutes)
convertFull(1, Speed.metersPerSecond, Speed.knots)
convertFull(0, Temperature.celsius, Temperature.fahrenheit)
convertFull(1, Area.hectares, Area.acres)
convertFull(1, Volume.liters, Volume.gallons)
convertFull(1, Energy.joules, Energy.calories)
convertFull(1, Power.watts, Power.horsepower)
convertFull(1, Frequency.hertz, Frequency.megahertz)
convertFull(180, Angle.degrees, Angle.radians)
convertFull(1, Pressure.atmospheres, Pressure.bars)

// ━━━ Section 4: add() / subtract() — all 12 categories (12 calls) ━━━

add(1, Length.kilometers, 500, Length.meters, Length.meters)
add(1, Mass.kilograms, 500, Mass.grams, Mass.grams)
add(60, Duration.seconds, 1, Duration.minutes, Duration.seconds)
add(100, Speed.kilometersPerHour, 10, Speed.milesPerHour, Speed.metersPerSecond)
add(100, Temperature.celsius, 50, Temperature.fahrenheit, Temperature.kelvin)
add(1, Area.hectares, 1000, Area.squareMeters, Area.squareMeters)
subtract(1, Volume.liters, 500, Volume.milliliters, Volume.milliliters)
subtract(1000, Energy.joules, 100, Energy.calories, Energy.kilojoules)
subtract(1, Power.kilowatts, 500, Power.watts, Power.watts)
subtract(1000, Frequency.hertz, 500, Frequency.hertz, Frequency.kilohertz)
subtract(180, Angle.degrees, 90, Angle.degrees, Angle.radians)
subtract(1, Pressure.atmospheres, 500, Pressure.millibars, Pressure.bars)

// ━━━ Section 5: multiply() / divide() — diverse category pairs (6 calls) ━━━

multiply(60, Speed.kilometersPerHour, 2, Duration.hours)
divide(100, Length.kilometers, 2, Duration.hours)
multiply(1, Power.kilowatts, 3, Duration.hours)
divide(1000, Energy.joules, 10, Duration.seconds)
multiply(5, Length.meters, 3, Length.meters)
divide(100, Volume.liters, 10, Area.squareMeters)

// ━━━ Section 6: resolveDimension() — multiple target categories (3 calls) ━━━

resolveDimension(120000, [1, 0, 0, 0, 0, 0, 0], Length.kilometers)
resolveDimension(3600, [0, 0, 1, 0, 0, 0, 0], Duration.hours)
resolveDimension(9.8, [1, 0, -2, 0, 0, 0, 0], Speed.metersPerSecond)

// ━━━ Section 7: Unit info APIs (7 calls) ━━━

getSymbol(Length.parsecs)
getSymbol(Mass.slugs)
getSymbol(Power.femtowatts)
getSymbol(Pressure.millimetersOfMercury)
getUnitsForCategory('length')
getUnitsForCategory('volume')
getCategories()

// ━━━ Section 8: Fluent builder — all 12 categories (18 calls) ━━━

measurement<LengthUnit>(1, Length.meters).to(Length.feet)
measurement<MassUnit>(1, Mass.kilograms).to(Mass.pounds)
measurement<DurationUnit>(60, Duration.seconds).to(Duration.minutes)
measurement<SpeedUnit>(100, Speed.kilometersPerHour).to(Speed.milesPerHour)
measurement<TemperatureUnit>(100, Temperature.celsius).to(Temperature.fahrenheit)
measurement<AreaUnit>(1, Area.hectares).to(Area.acres)
measurement<VolumeUnit>(1, Volume.liters).to(Volume.gallons)
measurement<EnergyUnit>(1000, Energy.joules).to(Energy.calories)
measurement<PowerUnit>(1, Power.kilowatts).to(Power.horsepower)
measurement<FrequencyUnit>(1000, Frequency.hertz).to(Frequency.kilohertz)
measurement<AngleUnit>(180, Angle.degrees).to(Angle.radians)
measurement<PressureUnit>(1, Pressure.atmospheres).to(Pressure.bars)
measurement<LengthUnit>(5, Length.miles).toFull(Length.kilometers)
measurement<LengthUnit>(5, Length.meters).add(3, Length.feet)
measurement<MassUnit>(10, Mass.kilograms).subtract(2, Mass.pounds)
measurement(60, Speed.kilometersPerHour).times(2, Duration.hours)
measurement(100, Length.kilometers).dividedBy(2, Duration.hours)
measurement(5, Length.miles).symbol()

// ━━━ Section 9: Exported type assertions (4 declare consts) ━━━
// Ambient declarations consume type-only imports without runtime cost,
// satisfying noUnusedLocals.

declare const _anyUnit: AnyUnit
declare const _unitCategory: UnitCategory
declare const _measurementResult: MeasurementResult
declare const _dimensionalResult: DimensionalResult

// ━━━ Section 10: Cross-category errors (16 @ts-expect-error) ━━━

// convert() — const objects (6 errors, covering all 12 categories)

// @ts-expect-error — cross-category: length → mass
convert(1, Length.meters, Mass.kilograms)

// @ts-expect-error — cross-category: duration → speed
convert(1, Duration.seconds, Speed.metersPerSecond)

// @ts-expect-error — cross-category: temperature → area
convert(1, Temperature.celsius, Area.squareMeters)

// @ts-expect-error — cross-category: volume → energy
convert(1, Volume.liters, Energy.joules)

// @ts-expect-error — cross-category: power → frequency
convert(1, Power.watts, Frequency.hertz)

// @ts-expect-error — cross-category: angle → pressure
convert(1, Angle.degrees, Pressure.bars)

// convert() — string literals (2 errors)

// @ts-expect-error — cross-category string literals: length → temperature
convert(1, 'miles', 'celsius')

// @ts-expect-error — cross-category string literals: mass → duration
convert(1, 'kilograms', 'seconds')

// convertFull() (2 errors)

// @ts-expect-error — cross-category convertFull: length → mass
convertFull(1, Length.feet, Mass.kilograms)

// @ts-expect-error — cross-category convertFull: energy → power
convertFull(1, Energy.joules, Power.watts)

// add() / subtract() (4 errors)

// @ts-expect-error — cross-category add: length × temperature
add(1, Length.miles, 1, Temperature.celsius, Length.meters)

// @ts-expect-error — cross-category add: mass × volume
add(1, Mass.kilograms, 1, Volume.liters, Mass.grams)

// @ts-expect-error — cross-category subtract: speed × duration
subtract(1, Speed.knots, 1, Duration.hours, Speed.metersPerSecond)

// @ts-expect-error — cross-category subtract: frequency × angle
subtract(1, Frequency.hertz, 1, Angle.degrees, Frequency.kilohertz)

// Fluent builder (2 errors)

// @ts-expect-error — fluent cross-category: length builder → mass target
measurement<LengthUnit>(5, Length.miles).to(Mass.kilograms)

// @ts-expect-error — fluent cross-category: speed builder → area in add
measurement<SpeedUnit>(100, Speed.kilometersPerHour).add(1, Area.squareMeters)

// ━━━ Section 11: Invalid unit strings (4 @ts-expect-error) ━━━

// @ts-expect-error — completely invalid unit string
convert(1, 'bananas', 'meters')

// @ts-expect-error — invalid target unit string
convert(1, 'meters', 'apples')

// @ts-expect-error — misspelled unit
convert(1, 'metre', 'feet')

// @ts-expect-error — empty string
convert(1, '', 'meters')

// ━━━ Section 12: Invalid API args (2 @ts-expect-error) ━━━

// @ts-expect-error — invalid category string for getUnitsForCategory
getUnitsForCategory('weight')

// @ts-expect-error — invalid unit string for getSymbol
getSymbol('notAUnit')
