/**
 * Type-level tests — verified by `tsc --noEmit`, not a test runner.
 *
 * Lines with `@ts-expect-error` MUST produce a compile error.
 * All other lines MUST compile without errors.
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
  type SpeedUnit,
} from '..'

// ─── Valid same-category convert() calls ───

convert(5, 'miles', 'kilometers')
convert(100, Length.meters, Length.feet)
convert(1, Mass.pounds, Mass.kilograms)
convert(60, Duration.minutes, Duration.hours)
convert(100, Speed.kilometersPerHour, Speed.milesPerHour)
convert(0, Temperature.celsius, Temperature.fahrenheit)
convert(1, Area.hectares, Area.acres)
convert(1, Volume.liters, Volume.gallons)
convert(1000, Energy.joules, Energy.calories)
convert(1, Power.kilowatts, Power.horsepower)
convert(1000, Frequency.hertz, Frequency.kilohertz)
convert(180, Angle.degrees, Angle.radians)
convert(1, Pressure.atmospheres, Pressure.bars)

// ─── Valid same-category convertFull() calls ───

convertFull(5, Mass.pounds, Mass.kilograms)
convertFull(100, Length.meters, Length.feet)

// ─── Valid same-category add() / subtract() calls ───

add(1, 'kilometers', 500, 'meters', 'meters')
subtract(1, Speed.milesPerHour, 1, Speed.knots, Speed.metersPerSecond)
add(100, Temperature.celsius, 50, Temperature.fahrenheit, Temperature.kelvin)

// ─── Valid cross-category multiply() / divide() ───

multiply(60, Speed.kilometersPerHour, 2, Duration.hours)
divide(100, Length.kilometers, 2, Duration.hours)

// ─── Valid resolveDimension() ───

resolveDimension(120000, [1, 0, 0, 0, 0, 0, 0], Length.kilometers)

// ─── Valid unit info calls ───

getSymbol(Length.nauticalMiles)
getUnitsForCategory('length')
getCategories()

// ─── Valid fluent builder calls ───

measurement(5, Length.miles).to(Length.miles)
measurement(5, Length.miles).symbol()
measurement<LengthUnit>(5, Length.miles).to(Length.kilometers)
measurement<SpeedUnit>(100, Speed.kilometersPerHour).to(Speed.milesPerHour)
measurement(60, Speed.kilometersPerHour).times(2, Duration.hours)
measurement(100, Length.kilometers).dividedBy(2, Duration.hours)

// ─── Cross-category convert() — must error ───

// @ts-expect-error — cross-category: length → temperature
convert(42, Length.miles, Temperature.celsius)

// @ts-expect-error — cross-category string literals
convert(1, 'miles', 'celsius')

// @ts-expect-error — cross-category: length → mass
convert(1, Length.feet, Mass.kilograms)

// @ts-expect-error — cross-category: speed → area
convert(100, Speed.knots, Area.squareMeters)

// ─── Invalid unit strings — must error ───

// @ts-expect-error — invalid unit string
convert(1, 'bananas', 'meters')

// @ts-expect-error — invalid target unit string
convert(1, 'meters', 'apples')

// ─── Cross-category convertFull() — must error ───

// @ts-expect-error — cross-category convertFull
convertFull(1, Length.feet, Mass.kilograms)

// ─── Cross-category add() / subtract() — must error ───

// @ts-expect-error — cross-category add
add(1, Length.miles, 1, Temperature.celsius, Length.meters)

// @ts-expect-error — cross-category subtract
subtract(1, Speed.knots, 1, Duration.hours, Speed.metersPerSecond)
