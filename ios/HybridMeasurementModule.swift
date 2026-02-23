import Foundation
import NitroModules

enum MeasurementError: LocalizedError {
  case categoryMismatch(from: String, to: String)
  case divisionByZero

  var errorDescription: String? {
    switch self {
    case .categoryMismatch(let from, let to):
      return "Cannot convert between different categories: \(from) and \(to)"
    case .divisionByZero:
      return "Division by zero"
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
    case .micrometers:              return UnitLength.micrometers
    case .nanometers:               return UnitLength.nanometers
    case .picometers:               return UnitLength.picometers
    case .megameters:               return UnitLength.megameters
    case .hectometers:              return UnitLength.hectometers
    case .decameters:               return UnitLength.decameters
    case .decimeters:               return UnitLength.decimeters
    case .scandinavianmiles:        return UnitLength.scandinavianMiles
    case .lightyears:               return UnitLength.lightyears
    case .fathoms:                  return UnitLength.fathoms
    case .furlongs:                 return UnitLength.furlongs
    case .astronomicalunits:        return UnitLength.astronomicalUnits
    case .parsecs:                  return UnitLength.parsecs
    // Mass
    case .kilograms:                return UnitMass.kilograms
    case .grams:                    return UnitMass.grams
    case .milligrams:               return UnitMass.milligrams
    case .pounds:                   return UnitMass.pounds
    case .ounces:                   return UnitMass.ounces
    case .stones:                   return UnitMass.stones
    case .metrictons:               return UnitMass.metricTons
    case .decigrams:                return UnitMass.decigrams
    case .centigrams:               return UnitMass.centigrams
    case .micrograms:               return UnitMass.micrograms
    case .nanograms:                return UnitMass.nanograms
    case .picograms:                return UnitMass.picograms
    case .shorttons:                return UnitMass.shortTons
    case .carats:                   return UnitMass.carats
    case .ouncestroy:               return UnitMass.ouncesTroy
    case .slugs:                    return UnitMass.slugs
    // Duration
    case .seconds:                  return UnitDuration.seconds
    case .minutes:                  return UnitDuration.minutes
    case .hours:                    return UnitDuration.hours
    case .milliseconds:             return UnitDuration.milliseconds
    case .microseconds:             return UnitDuration.microseconds
    case .nanoseconds:              return UnitDuration.nanoseconds
    case .picoseconds:              return UnitDuration.picoseconds
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
    case .squaremegameters:         return UnitArea.squareMegameters
    case .squarecentimeters:        return UnitArea.squareCentimeters
    case .squaremillimeters:        return UnitArea.squareMillimeters
    case .squaremicrometers:        return UnitArea.squareMicrometers
    case .squarenanometers:         return UnitArea.squareNanometers
    case .squareinches:             return UnitArea.squareInches
    case .squareyards:              return UnitArea.squareYards
    case .ares:                     return UnitArea.ares
    // Volume
    case .liters:                   return UnitVolume.liters
    case .milliliters:              return UnitVolume.milliliters
    case .gallons:                  return UnitVolume.gallons
    case .cups:                     return UnitVolume.cups
    case .fluidounces:              return UnitVolume.fluidOunces
    case .cubicmeters:              return UnitVolume.cubicMeters
    case .megaliters:               return UnitVolume.megaliters
    case .kiloliters:               return UnitVolume.kiloliters
    case .deciliters:               return UnitVolume.deciliters
    case .centiliters:              return UnitVolume.centiliters
    case .cubickilometers:          return UnitVolume.cubicKilometers
    case .cubicdecimeters:          return UnitVolume.cubicDecimeters
    case .cubiccentimeters:         return UnitVolume.cubicCentimeters
    case .cubicmillimeters:         return UnitVolume.cubicMillimeters
    case .cubicinches:              return UnitVolume.cubicInches
    case .cubicfeet:                return UnitVolume.cubicFeet
    case .cubicyards:               return UnitVolume.cubicYards
    case .cubicmiles:               return UnitVolume.cubicMiles
    case .acrefeet:                 return UnitVolume.acreFeet
    case .bushels:                  return UnitVolume.bushels
    case .teaspoons:                return UnitVolume.teaspoons
    case .tablespoons:              return UnitVolume.tablespoons
    case .pints:                    return UnitVolume.pints
    case .quarts:                   return UnitVolume.quarts
    case .imperialteaspoons:        return UnitVolume.imperialTeaspoons
    case .imperialtablespoons:      return UnitVolume.imperialTablespoons
    case .imperialfluidounces:      return UnitVolume.imperialFluidOunces
    case .imperialpints:            return UnitVolume.imperialPints
    case .imperialquarts:           return UnitVolume.imperialQuarts
    case .imperialgallons:          return UnitVolume.imperialGallons
    case .metriccups:               return UnitVolume.metricCups
    // Energy
    case .joules:                   return UnitEnergy.joules
    case .calories:                 return UnitEnergy.calories
    case .kilocalories:             return UnitEnergy.kilocalories
    case .kilowatthours:            return UnitEnergy.kilowattHours
    case .kilojoules:               return UnitEnergy.kilojoules
    // Power
    case .watts:                    return UnitPower.watts
    case .kilowatts:                return UnitPower.kilowatts
    case .horsepower:               return UnitPower.horsepower
    case .terawatts:                return UnitPower.terawatts
    case .gigawatts:                return UnitPower.gigawatts
    case .megawatts:                return UnitPower.megawatts
    case .milliwatts:               return UnitPower.milliwatts
    case .microwatts:               return UnitPower.microwatts
    case .nanowatts:                return UnitPower.nanowatts
    case .picowatts:                return UnitPower.picowatts
    case .femtowatts:               return UnitPower.femtowatts
    // Frequency
    case .hertz:                    return UnitFrequency.hertz
    case .kilohertz:                return UnitFrequency.kilohertz
    case .megahertz:                return UnitFrequency.megahertz
    case .gigahertz:                return UnitFrequency.gigahertz
    case .terahertz:                return UnitFrequency.terahertz
    case .millihertz:               return UnitFrequency.millihertz
    case .microhertz:               return UnitFrequency.microhertz
    case .nanohertz:                return UnitFrequency.nanohertz
    // Angle
    case .degrees:                  return UnitAngle.degrees
    case .radians:                  return UnitAngle.radians
    case .arcminutes:               return UnitAngle.arcMinutes
    case .arcseconds:               return UnitAngle.arcSeconds
    case .gradians:                 return UnitAngle.gradians
    case .revolutions:              return UnitAngle.revolutions
    // Pressure
    case .newtonspermeterssquared:  return UnitPressure.newtonsPerMetersSquared
    case .bars:                     return UnitPressure.bars
    case .millibars:                return UnitPressure.millibars
    case .atmospheres:              return Self.atmosphereUnit
    case .poundspersquareinch:      return UnitPressure.poundsForcePerSquareInch
    case .gigapascals:              return UnitPressure.gigapascals
    case .megapascals:              return UnitPressure.megapascals
    case .kilopascals:              return UnitPressure.kilopascals
    case .hectopascals:             return UnitPressure.hectopascals
    case .inchesofmercury:          return UnitPressure.inchesOfMercury
    case .millimetersofmercury:     return UnitPressure.millimetersOfMercury
    // Acceleration
    case .meterspersecondsquared:   return UnitAcceleration.metersPerSecondSquared
    case .gravity:                  return UnitAcceleration.gravity
    // ConcentrationMass
    case .gramsperliter:            return UnitConcentrationMass.gramsPerLiter
    case .milligramsperdeciliter:   return UnitConcentrationMass.milligramsPerDeciliter
    // Dispersion
    case .partspermillion:          return UnitDispersion.partsPerMillion
    // ElectricCharge
    case .coulombs:                 return UnitElectricCharge.coulombs
    case .megaamperehours:          return UnitElectricCharge.megaampereHours
    case .kiloamperehours:          return UnitElectricCharge.kiloampereHours
    case .amperehours:              return UnitElectricCharge.ampereHours
    case .milliamperehours:         return UnitElectricCharge.milliampereHours
    case .microamperehours:         return UnitElectricCharge.microampereHours
    // ElectricCurrent
    case .megaamperes:              return UnitElectricCurrent.megaamperes
    case .kiloamperes:              return UnitElectricCurrent.kiloamperes
    case .amperes:                  return UnitElectricCurrent.amperes
    case .milliamperes:             return UnitElectricCurrent.milliamperes
    case .microamperes:             return UnitElectricCurrent.microamperes
    // ElectricPotentialDifference
    case .megavolts:                return UnitElectricPotentialDifference.megavolts
    case .kilovolts:                return UnitElectricPotentialDifference.kilovolts
    case .volts:                    return UnitElectricPotentialDifference.volts
    case .millivolts:               return UnitElectricPotentialDifference.millivolts
    case .microvolts:               return UnitElectricPotentialDifference.microvolts
    // ElectricResistance
    case .megaohms:                 return UnitElectricResistance.megaohms
    case .kiloohms:                 return UnitElectricResistance.kiloohms
    case .ohms:                     return UnitElectricResistance.ohms
    case .milliohms:                return UnitElectricResistance.milliohms
    case .microohms:                return UnitElectricResistance.microohms
    // FuelEfficiency
    case .litersper100kilometers:   return UnitFuelEfficiency.litersPer100Kilometers
    case .milesperimperialgallon:   return UnitFuelEfficiency.milesPerImperialGallon
    case .milespergallon:           return UnitFuelEfficiency.milesPerGallon
    // Illuminance
    case .lux:                      return UnitIlluminance.lux
    // InformationStorage
    case .bytes:                    return UnitInformationStorage.bytes
    case .bits:                     return UnitInformationStorage.bits
    case .nibbles:                  return UnitInformationStorage.nibbles
    case .yottabytes:               return UnitInformationStorage.yottabytes
    case .zettabytes:               return UnitInformationStorage.zettabytes
    case .exabytes:                 return UnitInformationStorage.exabytes
    case .petabytes:                return UnitInformationStorage.petabytes
    case .terabytes:                return UnitInformationStorage.terabytes
    case .gigabytes:                return UnitInformationStorage.gigabytes
    case .megabytes:                return UnitInformationStorage.megabytes
    case .kilobytes:                return UnitInformationStorage.kilobytes
    case .yottabits:                return UnitInformationStorage.yottabits
    case .zettabits:                return UnitInformationStorage.zettabits
    case .exabits:                  return UnitInformationStorage.exabits
    case .petabits:                 return UnitInformationStorage.petabits
    case .terabits:                 return UnitInformationStorage.terabits
    case .gigabits:                 return UnitInformationStorage.gigabits
    case .megabits:                 return UnitInformationStorage.megabits
    case .kilobits:                 return UnitInformationStorage.kilobits
    case .yobibytes:                return UnitInformationStorage.yobibytes
    case .zebibytes:                return UnitInformationStorage.zebibytes
    case .exbibytes:                return UnitInformationStorage.exbibytes
    case .pebibytes:                return UnitInformationStorage.pebibytes
    case .tebibytes:                return UnitInformationStorage.tebibytes
    case .gibibytes:                return UnitInformationStorage.gibibytes
    case .mebibytes:                return UnitInformationStorage.mebibytes
    case .kibibytes:                return UnitInformationStorage.kibibytes
    case .yobibits:                 return UnitInformationStorage.yobibits
    case .zebibits:                 return UnitInformationStorage.zebibits
    case .exbibits:                 return UnitInformationStorage.exbibits
    case .pebibits:                 return UnitInformationStorage.pebibits
    case .tebibits:                 return UnitInformationStorage.tebibits
    case .gibibits:                 return UnitInformationStorage.gibibits
    case .mebibits:                 return UnitInformationStorage.mebibits
    case .kibibits:                 return UnitInformationStorage.kibibits
    }
  }

  private func categoryFor(_ unit: AnyUnit) -> UnitCategory {
    switch unit {
    case .meters, .kilometers, .centimeters, .millimeters, .miles, .yards, .feet, .inches, .nauticalmiles,
         .micrometers, .nanometers, .picometers, .megameters, .hectometers, .decameters, .decimeters,
         .scandinavianmiles, .lightyears, .fathoms, .furlongs, .astronomicalunits, .parsecs:
      return .length
    case .kilograms, .grams, .milligrams, .pounds, .ounces, .stones, .metrictons,
         .decigrams, .centigrams, .micrograms, .nanograms, .picograms, .shorttons, .carats, .ouncestroy, .slugs:
      return .mass
    case .seconds, .minutes, .hours, .milliseconds, .microseconds, .nanoseconds, .picoseconds:
      return .duration
    case .meterspersecond, .kilometersperhour, .milesperhour, .knots:
      return .speed
    case .celsius, .fahrenheit, .kelvin:
      return .temperature
    case .squaremeters, .squarekilometers, .squaremiles, .squarefeet, .hectares, .acres,
         .squaremegameters, .squarecentimeters, .squaremillimeters, .squaremicrometers, .squarenanometers,
         .squareinches, .squareyards, .ares:
      return .area
    case .liters, .milliliters, .gallons, .cups, .fluidounces, .cubicmeters,
         .megaliters, .kiloliters, .deciliters, .centiliters,
         .cubickilometers, .cubicdecimeters, .cubiccentimeters, .cubicmillimeters,
         .cubicinches, .cubicfeet, .cubicyards, .cubicmiles, .acrefeet, .bushels,
         .teaspoons, .tablespoons, .pints, .quarts,
         .imperialteaspoons, .imperialtablespoons, .imperialfluidounces,
         .imperialpints, .imperialquarts, .imperialgallons, .metriccups:
      return .volume
    case .joules, .calories, .kilocalories, .kilowatthours, .kilojoules:
      return .energy
    case .watts, .kilowatts, .horsepower,
         .terawatts, .gigawatts, .megawatts, .milliwatts, .microwatts, .nanowatts, .picowatts, .femtowatts:
      return .power
    case .hertz, .kilohertz, .megahertz, .gigahertz, .terahertz, .millihertz, .microhertz, .nanohertz:
      return .frequency
    case .degrees, .radians, .arcminutes, .arcseconds, .gradians, .revolutions:
      return .angle
    case .newtonspermeterssquared, .bars, .millibars, .atmospheres, .poundspersquareinch,
         .gigapascals, .megapascals, .kilopascals, .hectopascals, .inchesofmercury, .millimetersofmercury:
      return .pressure
    case .meterspersecondsquared, .gravity:
      return .acceleration
    case .gramsperliter, .milligramsperdeciliter:
      return .concentrationmass
    case .partspermillion:
      return .dispersion
    case .coulombs, .megaamperehours, .kiloamperehours, .amperehours, .milliamperehours, .microamperehours:
      return .electriccharge
    case .megaamperes, .kiloamperes, .amperes, .milliamperes, .microamperes:
      return .electriccurrent
    case .megavolts, .kilovolts, .volts, .millivolts, .microvolts:
      return .electricpotentialdifference
    case .megaohms, .kiloohms, .ohms, .milliohms, .microohms:
      return .electricresistance
    case .litersper100kilometers, .milesperimperialgallon, .milespergallon:
      return .fuelefficiency
    case .lux:
      return .illuminance
    case .bytes, .bits, .nibbles,
         .yottabytes, .zettabytes, .exabytes, .petabytes, .terabytes, .gigabytes, .megabytes, .kilobytes,
         .yottabits, .zettabits, .exabits, .petabits, .terabits, .gigabits, .megabits, .kilobits,
         .yobibytes, .zebibytes, .exbibytes, .pebibytes, .tebibytes, .gibibytes, .mebibytes, .kibibytes,
         .yobibits, .zebibits, .exbibits, .pebibits, .tebibits, .gibibits, .mebibits, .kibibits:
      return .informationstorage
    }
  }

  private static let unitsByCategory: [UnitCategory: [AnyUnit]] = [
    .length: [
      .meters, .kilometers, .centimeters, .millimeters, .miles, .yards, .feet, .inches, .nauticalmiles,
      .micrometers, .nanometers, .picometers, .megameters, .hectometers, .decameters, .decimeters,
      .scandinavianmiles, .lightyears, .fathoms, .furlongs, .astronomicalunits, .parsecs,
    ],
    .mass: [
      .kilograms, .grams, .milligrams, .pounds, .ounces, .stones, .metrictons,
      .decigrams, .centigrams, .micrograms, .nanograms, .picograms, .shorttons, .carats, .ouncestroy, .slugs,
    ],
    .duration: [
      .seconds, .minutes, .hours, .milliseconds, .microseconds, .nanoseconds, .picoseconds,
    ],
    .speed: [.meterspersecond, .kilometersperhour, .milesperhour, .knots],
    .temperature: [.celsius, .fahrenheit, .kelvin],
    .area: [
      .squaremeters, .squarekilometers, .squaremiles, .squarefeet, .hectares, .acres,
      .squaremegameters, .squarecentimeters, .squaremillimeters, .squaremicrometers, .squarenanometers,
      .squareinches, .squareyards, .ares,
    ],
    .volume: [
      .liters, .milliliters, .gallons, .cups, .fluidounces, .cubicmeters,
      .megaliters, .kiloliters, .deciliters, .centiliters,
      .cubickilometers, .cubicdecimeters, .cubiccentimeters, .cubicmillimeters,
      .cubicinches, .cubicfeet, .cubicyards, .cubicmiles, .acrefeet, .bushels,
      .teaspoons, .tablespoons, .pints, .quarts,
      .imperialteaspoons, .imperialtablespoons, .imperialfluidounces,
      .imperialpints, .imperialquarts, .imperialgallons, .metriccups,
    ],
    .energy: [.joules, .calories, .kilocalories, .kilowatthours, .kilojoules],
    .power: [
      .watts, .kilowatts, .horsepower,
      .terawatts, .gigawatts, .megawatts, .milliwatts, .microwatts, .nanowatts, .picowatts, .femtowatts,
    ],
    .frequency: [.hertz, .kilohertz, .megahertz, .gigahertz, .terahertz, .millihertz, .microhertz, .nanohertz],
    .angle: [.degrees, .radians, .arcminutes, .arcseconds, .gradians, .revolutions],
    .pressure: [
      .newtonspermeterssquared, .bars, .millibars, .atmospheres, .poundspersquareinch,
      .gigapascals, .megapascals, .kilopascals, .hectopascals, .inchesofmercury, .millimetersofmercury,
    ],
    .acceleration: [.meterspersecondsquared, .gravity],
    .concentrationmass: [.gramsperliter, .milligramsperdeciliter],
    .dispersion: [.partspermillion],
    .electriccharge: [
      .coulombs, .megaamperehours, .kiloamperehours, .amperehours, .milliamperehours, .microamperehours,
    ],
    .electriccurrent: [.megaamperes, .kiloamperes, .amperes, .milliamperes, .microamperes],
    .electricpotentialdifference: [.megavolts, .kilovolts, .volts, .millivolts, .microvolts],
    .electricresistance: [.megaohms, .kiloohms, .ohms, .milliohms, .microohms],
    .fuelefficiency: [.litersper100kilometers, .milesperimperialgallon, .milespergallon],
    .illuminance: [.lux],
    .informationstorage: [
      .bytes, .bits, .nibbles,
      .yottabytes, .zettabytes, .exabytes, .petabytes, .terabytes, .gigabytes, .megabytes, .kilobytes,
      .yottabits, .zettabits, .exabits, .petabits, .terabits, .gigabits, .megabits, .kilobits,
      .yobibytes, .zebibytes, .exbibytes, .pebibytes, .tebibytes, .gibibytes, .mebibytes, .kibibytes,
      .yobibits, .zebibits, .exbibits, .pebibits, .tebibits, .gibibits, .mebibits, .kibibits,
    ],
  ]

  private static let allCategories: [UnitCategory] = [
    .length, .mass, .duration, .speed, .temperature, .area,
    .volume, .energy, .power, .frequency, .angle, .pressure,
    .acceleration, .concentrationmass, .dispersion, .electriccharge,
    .electriccurrent, .electricpotentialdifference, .electricresistance,
    .fuelefficiency, .illuminance, .informationstorage,
  ]

  // SI 7-vector: [L, M, T, I, Θ, N, J]
  private static let categoryDimensions: [UnitCategory: [Double]] = [
    .length:      [1, 0, 0, 0, 0, 0, 0],
    .mass:        [0, 1, 0, 0, 0, 0, 0],
    .duration:    [0, 0, 1, 0, 0, 0, 0],
    .speed:       [1, 0, -1, 0, 0, 0, 0],
    .temperature: [0, 0, 0, 0, 1, 0, 0],
    .area:        [2, 0, 0, 0, 0, 0, 0],
    .volume:      [3, 0, 0, 0, 0, 0, 0],
    .energy:      [2, 1, -2, 0, 0, 0, 0],
    .power:       [2, 1, -3, 0, 0, 0, 0],
    .frequency:   [0, 0, -1, 0, 0, 0, 0],
    .angle:       [0, 0, 0, 0, 0, 0, 0],
    .pressure:                    [-1, 1, -2, 0, 0, 0, 0],
    .acceleration:                [1, 0, -2, 0, 0, 0, 0],
    .concentrationmass:           [-3, 1, 0, 0, 0, 0, 0],
    .dispersion:                  [0, 0, 0, 0, 0, 0, 0],
    .electriccharge:              [0, 0, 1, 1, 0, 0, 0],
    .electriccurrent:             [0, 0, 0, 1, 0, 0, 0],
    .electricpotentialdifference: [2, 1, -3, -1, 0, 0, 0],
    .electricresistance:          [2, 1, -3, -2, 0, 0, 0],
    .fuelefficiency:              [-2, 0, 0, 0, 0, 0, 0],
    .illuminance:                 [-2, 0, 0, 0, 0, 0, 1],
    .informationstorage:          [0, 0, 0, 0, 0, 0, 0],
  ]

  private static let dimensionLabels = ["L", "M", "T", "I", "Θ", "N", "J"]

  private func convertToBase(value: Double, unit: AnyUnit) -> Double {
    let dim = resolveUnit(unit)
    return Measurement(value: value, unit: dim).converted(to: type(of: dim).baseUnit()).value
  }

  private func dimensionLabel(_ dims: [Double]) -> String {
    var numerator: [String] = []
    var denominator: [String] = []
    for (i, exp) in dims.enumerated() {
      if exp == 1 {
        numerator.append(Self.dimensionLabels[i])
      } else if exp > 1 {
        numerator.append("\(Self.dimensionLabels[i])^\(Int(exp))")
      } else if exp == -1 {
        denominator.append(Self.dimensionLabels[i])
      } else if exp < -1 {
        denominator.append("\(Self.dimensionLabels[i])^\(Int(-exp))")
      }
    }
    if numerator.isEmpty && denominator.isEmpty {
      return "dimensionless"
    }
    let num = numerator.isEmpty ? "1" : numerator.joined(separator: "·")
    if denominator.isEmpty {
      return num
    }
    return "\(num)/\(denominator.joined(separator: "·"))"
  }

  func convert(value: Double, from fromUnit: AnyUnit, to toUnit: AnyUnit) throws -> Double {
    let fromCategory = categoryFor(fromUnit)
    let toCategory = categoryFor(toUnit)
    guard fromCategory == toCategory else {
      throw MeasurementError.categoryMismatch(from: fromCategory.stringValue, to: toCategory.stringValue)
    }

    let from = resolveUnit(fromUnit)
    let to = resolveUnit(toUnit)
    return Measurement(value: value, unit: from).converted(to: to).value
  }

  func convertFull(value: Double, from fromUnit: AnyUnit, to toUnit: AnyUnit) throws -> MeasurementResult {
    let converted = try convert(value: value, from: fromUnit, to: toUnit)
    let symbol = resolveUnit(toUnit).symbol
    let category = categoryFor(toUnit)
    return MeasurementResult(value: converted, unit: toUnit, category: category, symbol: symbol)
  }

  func getSymbol(unit: AnyUnit) throws -> String {
    return resolveUnit(unit).symbol
  }

  func getUnitsForCategory(category: UnitCategory) throws -> [AnyUnit] {
    return Self.unitsByCategory[category] ?? []
  }

  func getCategories() throws -> [UnitCategory] {
    return Self.allCategories
  }

  func add(valueA: Double, unitA: AnyUnit, valueB: Double, unitB: AnyUnit, resultUnit: AnyUnit) throws -> Double {
    let catA = categoryFor(unitA)
    let catB = categoryFor(unitB)
    let catResult = categoryFor(resultUnit)
    guard catA == catB, catB == catResult else {
      throw MeasurementError.categoryMismatch(from: catA.stringValue, to: catB.stringValue)
    }
    let a = try convert(value: valueA, from: unitA, to: resultUnit)
    let b = try convert(value: valueB, from: unitB, to: resultUnit)
    return a + b
  }

  func subtract(valueA: Double, unitA: AnyUnit, valueB: Double, unitB: AnyUnit, resultUnit: AnyUnit) throws -> Double {
    let catA = categoryFor(unitA)
    let catB = categoryFor(unitB)
    let catResult = categoryFor(resultUnit)
    guard catA == catB, catB == catResult else {
      throw MeasurementError.categoryMismatch(from: catA.stringValue, to: catB.stringValue)
    }
    let a = try convert(value: valueA, from: unitA, to: resultUnit)
    let b = try convert(value: valueB, from: unitB, to: resultUnit)
    return a - b
  }

  func multiply(valueA: Double, unitA: AnyUnit, valueB: Double, unitB: AnyUnit) throws -> DimensionalResult {
    let baseA = convertToBase(value: valueA, unit: unitA)
    let baseB = convertToBase(value: valueB, unit: unitB)
    let catA = categoryFor(unitA)
    let catB = categoryFor(unitB)
    let dimsA = Self.categoryDimensions[catA]!
    let dimsB = Self.categoryDimensions[catB]!
    let dims = zip(dimsA, dimsB).map { $0 + $1 }
    return DimensionalResult(value: baseA * baseB, dimensions: dims, dimensionLabel: dimensionLabel(dims))
  }

  func divide(valueA: Double, unitA: AnyUnit, valueB: Double, unitB: AnyUnit) throws -> DimensionalResult {
    let baseB = convertToBase(value: valueB, unit: unitB)
    guard baseB != 0 else {
      throw MeasurementError.divisionByZero
    }
    let baseA = convertToBase(value: valueA, unit: unitA)
    let catA = categoryFor(unitA)
    let catB = categoryFor(unitB)
    let dimsA = Self.categoryDimensions[catA]!
    let dimsB = Self.categoryDimensions[catB]!
    let dims = zip(dimsA, dimsB).map { $0 - $1 }
    return DimensionalResult(value: baseA / baseB, dimensions: dims, dimensionLabel: dimensionLabel(dims))
  }

  func resolveDimension(value: Double, dimensions: [Double], targetUnit: AnyUnit) throws -> MeasurementResult? {
    let targetCat = categoryFor(targetUnit)
    guard let targetDims = Self.categoryDimensions[targetCat] else {
      return nil
    }
    // Check if dimensions match within tolerance
    guard dimensions.count == targetDims.count else {
      return nil
    }
    for i in 0..<dimensions.count {
      let diff: Double = Swift.abs(dimensions[i] - targetDims[i])
      if diff > 1e-10 {
        return nil
      }
    }
    // Value is in SI base units — convert from base to target unit
    let targetDim = resolveUnit(targetUnit)
    let baseUnit = type(of: targetDim).baseUnit()
    let converted = Measurement(value: value, unit: baseUnit).converted(to: targetDim).value
    let symbol = targetDim.symbol
    return MeasurementResult(value: converted, unit: targetUnit, category: targetCat, symbol: symbol)
  }
}
