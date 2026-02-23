import Foundation
import NitroModules

class HybridMeasurementModule: HybridMeasurementModuleSpec {
  private func resolveLength(_ unit: LengthUnit) -> UnitLength {
    switch unit {
    case .meters: return .meters
    case .kilometers: return .kilometers
    case .centimeters: return .centimeters
    case .millimeters: return .millimeters
    case .miles: return .miles
    case .yards: return .yards
    case .feet: return .feet
    case .inches: return .inches
    case .nauticalmiles: return .nauticalMiles
    }
  }

  func convert(value: Double, from fromUnit: LengthUnit, to toUnit: LengthUnit) throws -> Double {
    let from = resolveLength(fromUnit)
    let to = resolveLength(toUnit)
    return Measurement(value: value, unit: from).converted(to: to).value
  }
}
