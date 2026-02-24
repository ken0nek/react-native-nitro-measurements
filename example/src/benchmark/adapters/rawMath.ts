import type { ConversionAdapter } from '../types'

// Conversion factors to SI base units (or common base)
// For temperature we use special handling since it's offset-based
const toBase: Record<string, number | [number, number]> = {
  // Duration → seconds
  hours: 3600,
  minutes: 60,
  seconds: 1,
  milliseconds: 0.001,
  // Length → meters
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  inches: 0.0254,
  feet: 0.3048,
  miles: 1609.344,
  yards: 0.9144,
  // Volume → liters
  liters: 1,
  milliliters: 0.001,
  gallons: 3.78541,
  cubicInches: 0.0163871,
  cups: 0.236588,
  // Mass → kilograms
  kilograms: 1,
  grams: 0.001,
  pounds: 0.453592,
  ounces: 0.0283495,
  // Temperature: [multiplier, offset] to kelvin
  celsius: [1, 273.15],
  fahrenheit: [5 / 9, 459.67 * 5 / 9],
  kelvin: [1, 0],
}

function isLinear(factor: number | [number, number]): factor is number {
  return typeof factor === 'number'
}

function toBaseValue(value: number, unit: string): number {
  const factor = toBase[unit]
  if (factor === undefined) throw new Error(`Unknown unit: ${unit}`)
  if (isLinear(factor)) return value * factor
  // Temperature: kelvin = value * mult + offset
  return value * factor[0] + factor[1]
}

function fromBaseValue(baseValue: number, unit: string): number {
  const factor = toBase[unit]
  if (factor === undefined) throw new Error(`Unknown unit: ${unit}`)
  if (isLinear(factor)) return baseValue / factor
  // From kelvin: value = (kelvin - offset) / mult
  return (baseValue - factor[1]) / factor[0]
}

export const rawMathAdapter: ConversionAdapter = {
  name: 'Raw Math',
  convert: (value: number, from: string, to: string) => {
    const base = toBaseValue(value, from)
    return fromBaseValue(base, to)
  },
  add: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) => {
    const baseA = toBaseValue(valueA, unitA)
    const baseB = toBaseValue(valueB, unitB)
    return fromBaseValue(baseA + baseB, resultUnit)
  },
  subtract: (valueA: number, unitA: string, valueB: number, unitB: string, resultUnit: string) => {
    const baseA = toBaseValue(valueA, unitA)
    const baseB = toBaseValue(valueB, unitB)
    return fromBaseValue(baseA - baseB, resultUnit)
  },
}
