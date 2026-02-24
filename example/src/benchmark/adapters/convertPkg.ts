import convert from 'convert'
import type { ConversionAdapter } from '../types'

// Map our unit names to convert (jonahsnider) unit names
const unitMap: Record<string, string> = {
  // Duration
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  milliseconds: 'milliseconds',
  // Length
  inches: 'inches',
  millimeters: 'millimeters',
  meters: 'meters',
  kilometers: 'kilometers',
  feet: 'feet',
  miles: 'miles',
  centimeters: 'centimeters',
  yards: 'yards',
  // Volume
  liters: 'litres',
  cubicInches: 'cubic inches',
  milliliters: 'millilitres',
  gallons: 'US liquid gallons',
  // Temperature
  celsius: 'celsius',
  fahrenheit: 'fahrenheit',
  kelvin: 'kelvin',
  // Mass
  kilograms: 'kilograms',
  pounds: 'pounds',
  grams: 'grams',
  ounces: 'ounces',
}

function mapUnit(unit: string): string {
  return unitMap[unit] ?? unit
}

export const convertPkgAdapter: ConversionAdapter = {
  name: 'convert',
  convert: (value: number, from: string, to: string) =>
    convert(value, mapUnit(from) as any).to(mapUnit(to) as any) as unknown as number,
}
