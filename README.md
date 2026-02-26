# react-native-nitro-measurements

[![npm](https://img.shields.io/npm/v/react-native-nitro-measurements)](https://www.npmjs.com/package/react-native-nitro-measurements)

Type-safe unit conversion and dimensional analysis for React Native, powered by [NitroModules](https://nitro.margelo.com).

## Features

- **Compile-time category safety** — TypeScript overloads prevent cross-category conversions (`miles` to `celsius` is a TS error, not a runtime crash)
- **22 unit categories, 203 units** — length, mass, duration, speed, temperature, area, volume, energy, power, frequency, angle, pressure, acceleration, concentration mass, dispersion, electric charge, electric current, electric potential difference, electric resistance, fuel efficiency, illuminance, information storage
- **SI dimensional analysis** — `speed * time = distance` with full dimension tracking
- **Zero JS bundle cost** — all conversion logic runs in native code (Swift Foundation)
- **Synchronous JSI** — no bridge serialization, no async overhead
- **Autocomplete** — `as const satisfies` objects provide full IDE support (`Length.` shows all 22 length units, `InformationStorage.` shows all 35 storage units)

## Installation

```bash
npm install react-native-nitro-measurements react-native-nitro-modules
```

Then rebuild your native app:

```bash
cd ios && pod install && cd ..
npx expo run:ios   # or npx react-native run-ios
```

> **Note:** iOS only for v1. Android support is planned for a future release.

## Quick Start

```typescript
import { convert, Length, Temperature } from 'react-native-nitro-measurements'

// Convert 5 miles to kilometers
const km = convert(5, Length.miles, Length.kilometers) // ~8.047

// String literals also work
const fahrenheit = convert(100, 'celsius', 'fahrenheit') // 212

// Cross-category conversion is a compile-time error:
// convert(42, Length.miles, Temperature.celsius)
//                          ^^^^^^^^^^^^^^^^^^^ TS2345
```

## API Reference

### `convert(value, from, to)`

Converts a numeric value between two units in the same category. Returns a `number`.

```typescript
convert(5, Length.miles, Length.kilometers) // 8.04672
convert(100, 'celsius', 'fahrenheit')      // 212
```

### `convertFull(value, from, to)`

Like `convert()`, but returns a `MeasurementResult` with metadata.

```typescript
convertFull(5, Length.miles, Length.kilometers)
// { value: 8.04672, unit: 'kilometers', category: 'length', symbol: 'km' }
```

### `add(valueA, unitA, valueB, unitB, resultUnit)`

Adds two measurements in the same category, returning the result in `resultUnit`.

```typescript
add(1, 'kilometers', 500, 'meters', 'meters') // 1500
```

### `subtract(valueA, unitA, valueB, unitB, resultUnit)`

Subtracts two measurements in the same category, returning the result in `resultUnit`.

```typescript
subtract(1, Length.miles, 1, Length.kilometers, Length.meters) // ~609.344
```

### `multiply(valueA, unitA, valueB, unitB)`

Cross-category multiplication with SI dimensional analysis. Returns a `DimensionalResult`.

```typescript
multiply(60, Speed.kilometersPerHour, 2, Duration.hours)
// { value: 33333.33, dimensions: [1,0,0,0,0,0,0], dimensionLabel: 'L' }
```

### `divide(valueA, unitA, valueB, unitB)`

Cross-category division with SI dimensional analysis. Returns a `DimensionalResult`.

```typescript
divide(100, Length.kilometers, 2, Duration.hours)
// { value: 50000, dimensions: [1,0,-1,0,0,0,0], dimensionLabel: 'L/T' }
```

### `resolveDimension(value, dimensions, targetUnit)`

Resolves a dimensional analysis result back to a named unit. Returns `MeasurementResult | undefined` (`undefined` if dimensions don't match the target unit's category).

```typescript
resolveDimension(120000, [1, 0, 0, 0, 0, 0, 0], Length.kilometers)
// { value: 120, unit: 'kilometers', category: 'length', symbol: 'km' }

resolveDimension(120000, [1, 0, 0, 0, 0, 0, 0], Temperature.celsius)
// undefined (dimension mismatch)
```

### `getSymbol(unit)`

Returns the localized symbol for a unit.

```typescript
getSymbol(Length.nauticalMiles) // 'NM'
getSymbol('kilograms')         // 'kg'
```

### `getUnitsForCategory(category)`

Returns all unit identifiers for a category, sorted alphabetically.

```typescript
getUnitsForCategory('length')
// ['centimeters', 'feet', 'inches', 'kilometers', 'meters', 'miles', ...]
```

### `getCategories()`

Returns all available unit categories.

```typescript
getCategories()
// ['angle', 'area', 'duration', 'energy', 'frequency', 'length', ...]
```

### `measurement(value, unit)` — Fluent Builder

A chainable API for conversions, arithmetic, and dimensional analysis.

```typescript
import { measurement, Length, Speed, Duration } from 'react-native-nitro-measurements'

// Simple conversion
measurement(5, Length.miles).to(Length.miles)

// Full result with metadata
measurement(5, Length.miles).toFull(Length.miles)

// Arithmetic
measurement(1, Length.kilometers).add(500, Length.meters)

// Cross-category dimensional analysis
measurement(60, Speed.kilometersPerHour).times(2, Duration.hours)
measurement(100, Length.kilometers).dividedBy(2, Duration.hours)

// Get unit symbol
measurement(5, Length.miles).symbol() // 'mi'
```

## Type Safety

TypeScript function overloads enforce that `from` and `to` units belong to the same category at compile time:

```typescript
// These compile:
convert(5, Length.miles, Length.kilometers)
convert(100, Temperature.celsius, Temperature.fahrenheit)

// These are compile-time errors:
convert(42, Length.miles, Temperature.celsius)     // TS2345
convert(1, 'miles', 'celsius')                     // TS2345
add(1, Length.miles, 1, Mass.kilograms, Length.meters) // TS2345
```

The `as const satisfies` objects (`Length`, `Mass`, `Speed`, etc.) provide full autocomplete in your IDE while preserving the string literal types needed for overload resolution.

## Unit Categories

| Category | # | Units |
|---|---|---|
| **Length** | 22 | meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, nauticalMiles, micrometers, nanometers, picometers, megameters, hectometers, decameters, decimeters, scandinavianMiles, lightyears, fathoms, furlongs, astronomicalUnits, parsecs |
| **Mass** | 16 | kilograms, grams, milligrams, pounds, ounces, stones, metricTons, decigrams, centigrams, micrograms, nanograms, picograms, shortTons, carats, ouncesTroy, slugs |
| **Duration** | 7 | seconds, minutes, hours, milliseconds, microseconds, nanoseconds, picoseconds |
| **Speed** | 4 | metersPerSecond, kilometersPerHour, milesPerHour, knots |
| **Temperature** | 3 | celsius, fahrenheit, kelvin |
| **Area** | 14 | squareMeters, squareKilometers, squareMiles, squareFeet, hectares, acres, squareMegameters, squareCentimeters, squareMillimeters, squareMicrometers, squareNanometers, squareInches, squareYards, ares |
| **Volume** | 31 | liters, milliliters, gallons, cups, fluidOunces, cubicMeters, megaliters, kiloliters, deciliters, centiliters, cubicKilometers, cubicDecimeters, cubicCentimeters, cubicMillimeters, cubicInches, cubicFeet, cubicYards, cubicMiles, acreFeet, bushels, teaspoons, tablespoons, pints, quarts, imperialTeaspoons, imperialTablespoons, imperialFluidOunces, imperialPints, imperialQuarts, imperialGallons, metricCups |
| **Energy** | 5 | joules, calories, kilocalories, kilowattHours, kilojoules |
| **Power** | 11 | watts, kilowatts, horsepower, terawatts, gigawatts, megawatts, milliwatts, microwatts, nanowatts, picowatts, femtowatts |
| **Frequency** | 8 | hertz, kilohertz, megahertz, gigahertz, terahertz, millihertz, microhertz, nanohertz |
| **Angle** | 6 | degrees, radians, arcMinutes, arcSeconds, gradians, revolutions |
| **Pressure** | 11 | newtonsPerMetersSquared, bars, millibars, atmospheres, poundsPerSquareInch, gigapascals, megapascals, kilopascals, hectopascals, inchesOfMercury, millimetersOfMercury |
| **Acceleration** | 2 | metersPerSecondSquared, gravity |
| **ConcentrationMass** | 2 | gramsPerLiter, milligramsPerDeciliter |
| **Dispersion** | 1 | partsPerMillion |
| **ElectricCharge** | 6 | coulombs, megaampereHours, kiloampereHours, ampereHours, milliampereHours, microampereHours |
| **ElectricCurrent** | 5 | megaamperes, kiloamperes, amperes, milliamperes, microamperes |
| **ElectricPotentialDifference** | 5 | megavolts, kilovolts, volts, millivolts, microvolts |
| **ElectricResistance** | 5 | megaohms, kiloohms, ohms, milliohms, microohms |
| **FuelEfficiency** | 3 | litersPer100Kilometers, milesPerImperialGallon, milesPerGallon |
| **Illuminance** | 1 | lux |
| **InformationStorage** | 35 | bytes, bits, nibbles, yottabytes, zettabytes, exabytes, petabytes, terabytes, gigabytes, megabytes, kilobytes, yottabits, zettabits, exabits, petabits, terabits, gigabits, megabits, kilobits, yobibytes, zebibytes, exbibytes, pebibytes, tebibytes, gibibytes, mebibytes, kibibytes, yobibits, zebibits, exbibits, pebibits, tebibits, gibibits, mebibits, kibibits |

## Benchmark

Sub-microsecond JSI-native conversions with type safety and dimensional analysis — comparable to lightweight JS math, 6–34x faster than `convert-units`.

| Benchmark | nitro | convert-units | convert | Raw Math |
|---|---|---|---|---|
| 4 in → mm | 0.7 µs | 4.3 µs | 0.7 µs | 0.3 µs |
| 100°C → °F | 0.7 µs | 24.0 µs | 0.8 µs | 0.3 µs |
| km→mi × 1000 | 0.56 ms | 4.79 ms | 0.62 ms | 0.20 ms |
| 1 km + 500 m | 1.0 µs | — | — | 0.4 µs |

> **Environment:** iPhone 16 Pro simulator, React Native 0.81, 5000 iterations with 50 warm-up.
> `nitro` = this library, `convert-units` = [convert-units](https://www.npmjs.com/package/convert-units), `convert` = [convert](https://www.npmjs.com/package/convert), Raw Math = inline JS arithmetic.

Full results across iteration counts in [`benchmark/`](./benchmark/).

## License

MIT
