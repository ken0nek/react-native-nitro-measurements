import Foundation
import NitroModules

enum MeasurementError: LocalizedError {
  case categoryMismatch(from: String, to: String)

  var errorDescription: String? {
    switch self {
    case .categoryMismatch(let from, let to):
      return "Cannot convert between different categories: \(from) and \(to)"
    }
  }
}

class HybridMeasurementModule: HybridMeasurementModuleSpec {

  private static let atmosphereUnit = UnitPressure(
    symbol: "atm",
    converter: UnitConverterLinear(coefficient: 101325.0)
  )

  private func resolveUnit(_ unit: AnyUnit) -> Dimension {
    switch unit {
    // Length
    case .meters:                   return UnitLength.meters
    case .kilometers:               return UnitLength.kilometers
    case .centimeters:              return UnitLength.centimeters
    case .millimeters:              return UnitLength.millimeters
    case .miles:                    return UnitLength.miles
    case .yards:                    return UnitLength.yards
    case .feet:                     return UnitLength.feet
    case .inches:                   return UnitLength.inches
    case .nauticalmiles:            return UnitLength.nauticalMiles
    // Mass
    case .kilograms:                return UnitMass.kilograms
    case .grams:                    return UnitMass.grams
    case .milligrams:               return UnitMass.milligrams
    case .pounds:                   return UnitMass.pounds
    case .ounces:                   return UnitMass.ounces
    case .stones:                   return UnitMass.stones
    case .metrictons:               return UnitMass.metricTons
    // Duration
    case .seconds:                  return UnitDuration.seconds
    case .minutes:                  return UnitDuration.minutes
    case .hours:                    return UnitDuration.hours
    // Speed
    case .meterspersecond:          return UnitSpeed.metersPerSecond
    case .kilometersperhour:        return UnitSpeed.kilometersPerHour
    case .milesperhour:             return UnitSpeed.milesPerHour
    case .knots:                    return UnitSpeed.knots
    // Temperature
    case .celsius:                  return UnitTemperature.celsius
    case .fahrenheit:               return UnitTemperature.fahrenheit
    case .kelvin:                   return UnitTemperature.kelvin
    // Area
    case .squaremeters:             return UnitArea.squareMeters
    case .squarekilometers:         return UnitArea.squareKilometers
    case .squaremiles:              return UnitArea.squareMiles
    case .squarefeet:               return UnitArea.squareFeet
    case .hectares:                 return UnitArea.hectares
    case .acres:                    return UnitArea.acres
    // Volume
    case .liters:                   return UnitVolume.liters
    case .milliliters:              return UnitVolume.milliliters
    case .gallons:                  return UnitVolume.gallons
    case .cups:                     return UnitVolume.cups
    case .fluidounces:              return UnitVolume.fluidOunces
    case .cubicmeters:              return UnitVolume.cubicMeters
    // Energy
    case .joules:                   return UnitEnergy.joules
    case .calories:                 return UnitEnergy.calories
    case .kilocalories:             return UnitEnergy.kilocalories
    case .kilowatthours:            return UnitEnergy.kilowattHours
    // Power
    case .watts:                    return UnitPower.watts
    case .kilowatts:                return UnitPower.kilowatts
    case .horsepower:               return UnitPower.horsepower
    // Frequency
    case .hertz:                    return UnitFrequency.hertz
    case .kilohertz:                return UnitFrequency.kilohertz
    case .megahertz:                return UnitFrequency.megahertz
    case .gigahertz:                return UnitFrequency.gigahertz
    // Angle
    case .degrees:                  return UnitAngle.degrees
    case .radians:                  return UnitAngle.radians
    // Pressure
    case .newtonspermeterssquared:  return UnitPressure.newtonsPerMetersSquared
    case .bars:                     return UnitPressure.bars
    case .millibars:                return UnitPressure.millibars
    case .atmospheres:              return Self.atmosphereUnit
    case .poundspersquareinch:      return UnitPressure.poundsForcePerSquareInch
    }
  }

  private func categoryFor(_ unit: AnyUnit) -> String {
    switch unit {
    case .meters, .kilometers, .centimeters, .millimeters, .miles, .yards, .feet, .inches, .nauticalmiles:
      return "length"
    case .kilograms, .grams, .milligrams, .pounds, .ounces, .stones, .metrictons:
      return "mass"
    case .seconds, .minutes, .hours:
      return "duration"
    case .meterspersecond, .kilometersperhour, .milesperhour, .knots:
      return "speed"
    case .celsius, .fahrenheit, .kelvin:
      return "temperature"
    case .squaremeters, .squarekilometers, .squaremiles, .squarefeet, .hectares, .acres:
      return "area"
    case .liters, .milliliters, .gallons, .cups, .fluidounces, .cubicmeters:
      return "volume"
    case .joules, .calories, .kilocalories, .kilowatthours:
      return "energy"
    case .watts, .kilowatts, .horsepower:
      return "power"
    case .hertz, .kilohertz, .megahertz, .gigahertz:
      return "frequency"
    case .degrees, .radians:
      return "angle"
    case .newtonspermeterssquared, .bars, .millibars, .atmospheres, .poundspersquareinch:
      return "pressure"
    }
  }

  func convert(value: Double, from fromUnit: AnyUnit, to toUnit: AnyUnit) throws -> Double {
    let fromCategory = categoryFor(fromUnit)
    let toCategory = categoryFor(toUnit)
    guard fromCategory == toCategory else {
      throw MeasurementError.categoryMismatch(from: fromCategory, to: toCategory)
    }

    let from = resolveUnit(fromUnit)
    let to = resolveUnit(toUnit)
    return Measurement(value: value, unit: from).converted(to: to).value
  }
}
