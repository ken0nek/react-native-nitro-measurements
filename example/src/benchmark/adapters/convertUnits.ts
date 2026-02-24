// @ts-expect-error convert-units v2 uses CommonJS
import convertUnits from 'convert-units'
import type { ConversionAdapter } from '../types'

// Map our unit names to convert-units v2 abbreviations
const unitMap: Record<string, string> = {
  // Duration
  hours: 'h',
  minutes: 'min',
  seconds: 's',
  milliseconds: 'ms',
  // Length
  inches: 'in',
  millimeters: 'mm',
  meters: 'm',
  kilometers: 'km',
  feet: 'ft',
  miles: 'mi',
  centimeters: 'cm',
  yards: 'yd',
  // Volume
  liters: 'l',
  cubicInches: 'in3',
  milliliters: 'ml',
  gallons: 'gal',
  cups: 'cup',
  // Temperature
  celsius: 'C',
  fahrenheit: 'F',
  kelvin: 'K',
  // Mass
  kilograms: 'kg',
  pounds: 'lb',
  grams: 'g',
  ounces: 'oz',
  metricTons: 'mt',
}

function mapUnit(unit: string): string {
  return unitMap[unit] ?? unit
}

export const convertUnitsAdapter: ConversionAdapter = {
  name: 'convert-units',
  convert: (value: number, from: string, to: string) =>
    convertUnits(value).from(mapUnit(from)).to(mapUnit(to)),
}
