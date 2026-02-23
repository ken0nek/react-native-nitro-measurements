import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { convert, convertFull, getSymbol, getUnitsForCategory, getCategories } from 'react-native-nitro-measurements';

const results = [
  // Length
  { label: '5 miles → km', value: convert(5, 'miles', 'kilometers') },
  { label: '1 foot → inches', value: convert(1, 'feet', 'inches') },
  { label: '1 nmi → meters', value: convert(1, 'nauticalMiles', 'meters') },
  // Mass
  { label: '1 kg → lbs', value: convert(1, 'kilograms', 'pounds') },
  // Duration
  { label: '1 hr → sec', value: convert(1, 'hours', 'seconds') },
  // Speed
  { label: '100 km/h → mph', value: convert(100, 'kilometersPerHour', 'milesPerHour') },
  // Temperature
  { label: '100°C → °F', value: convert(100, 'celsius', 'fahrenheit') },
  // Area
  { label: '1 km² → hectares', value: convert(1, 'squareKilometers', 'hectares') },
  // Volume
  { label: '1 gal → liters', value: convert(1, 'gallons', 'liters') },
  // Energy
  { label: '1 kcal → joules', value: convert(1, 'kilocalories', 'joules') },
  // Power
  { label: '1 hp → watts', value: convert(1, 'horsepower', 'watts') },
  // Frequency
  { label: '1 GHz → MHz', value: convert(1, 'gigahertz', 'megahertz') },
  // Angle
  { label: '180° → rad', value: convert(180, 'degrees', 'radians') },
  // Pressure
  { label: '1 atm → bars', value: convert(1, 'atmospheres', 'bars') },
];

let crossCategoryError = '';
try {
  convert(1, 'miles', 'celsius');
} catch (e: any) {
  crossCategoryError = e.message;
}

// M3: Rich results & discovery APIs
const fullResult = convertFull(5, 'miles', 'kilometers');
const nmiSymbol = getSymbol('nauticalMiles');
const lengthUnits = getUnitsForCategory('length');
const allCategories = getCategories();

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nitro Measurements</Text>
      {results.map((r) => (
        <Text key={r.label} style={styles.row}>
          {r.label}: {r.value}
        </Text>
      ))}
      <Text style={[styles.row, styles.error]}>
        miles → celsius: {crossCategoryError}
      </Text>

      <Text style={styles.subtitle}>M3: Rich Results</Text>
      <Text style={styles.row}>
        convertFull(5, miles, km): {fullResult.value} {fullResult.symbol} [{fullResult.category}]
      </Text>
      <Text style={styles.row}>
        getSymbol(nauticalMiles): {nmiSymbol}
      </Text>
      <Text style={styles.row}>
        length units ({lengthUnits.length}): {lengthUnits.join(', ')}
      </Text>
      <Text style={styles.row}>
        categories ({allCategories.length}): {allCategories.join(', ')}
      </Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    fontSize: 18,
    marginVertical: 4,
  },
  error: {
    color: 'red',
    marginTop: 12,
  },
});
