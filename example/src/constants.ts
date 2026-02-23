import type { UnitCategory } from 'react-native-nitro-measurements'

export const CATEGORY_DISPLAY_NAMES: Record<UnitCategory, string> = {
  length: 'Length',
  mass: 'Mass',
  duration: 'Duration',
  speed: 'Speed',
  temperature: 'Temperature',
  area: 'Area',
  volume: 'Volume',
  energy: 'Energy',
  power: 'Power',
  frequency: 'Frequency',
  angle: 'Angle',
  pressure: 'Pressure',
  acceleration: 'Acceleration',
  concentrationMass: 'Concentration',
  dispersion: 'Dispersion',
  electricCharge: 'Charge',
  electricCurrent: 'Current',
  electricPotentialDifference: 'Voltage',
  electricResistance: 'Resistance',
  fuelEfficiency: 'Fuel Efficiency',
  illuminance: 'Illuminance',
  informationStorage: 'Storage',
}

export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return String(n)
  if (Number.isInteger(n)) return n.toLocaleString()
  const abs = Math.abs(n)
  if (abs >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  if (abs >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 6 })
  if (abs >= 0.001) return n.toLocaleString(undefined, { maximumFractionDigits: 8 })
  return n.toExponential(4)
}
