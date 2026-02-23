# react-native-nitro-measurements

Type-safe unit conversion and dimensional analysis for React Native, powered by [NitroModules](https://nitro.margelo.com).

## Features

- **Compile-time category safety** — TypeScript overloads prevent cross-category conversions (`miles` to `celsius` is a TS error, not a runtime crash)
- **12 unit categories, 56 units** — length, mass, duration, speed, temperature, area, volume, energy, power, frequency, angle, pressure
- **SI dimensional analysis** — `speed * time = distance` with full dimension tracking
- **Zero JS bundle cost** — all conversion logic runs in native code (Swift Foundation)
- **Synchronous JSI** — no bridge serialization, no async overhead
- **Autocomplete** — `as const satisfies` objects provide full IDE support (`Length.` shows all 9 length units)

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

| Category | Units |
|---|---|
| **Length** | meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, nauticalMiles |
| **Mass** | kilograms, grams, milligrams, pounds, ounces, stones, metricTons |
| **Duration** | seconds, minutes, hours |
| **Speed** | metersPerSecond, kilometersPerHour, milesPerHour, knots |
| **Temperature** | celsius, fahrenheit, kelvin |
| **Area** | squareMeters, squareKilometers, squareMiles, squareFeet, hectares, acres |
| **Volume** | liters, milliliters, gallons, cups, fluidOunces, cubicMeters |
| **Energy** | joules, calories, kilocalories, kilowattHours |
| **Power** | watts, kilowatts, horsepower |
| **Frequency** | hertz, kilohertz, megahertz, gigahertz |
| **Angle** | degrees, radians |
| **Pressure** | newtonsPerMetersSquared, bars, millibars, atmospheres, poundsPerSquareInch |

## License

MIT
