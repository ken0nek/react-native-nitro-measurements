import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { convert } from 'react-native-nitro-measurements';

const results = [
  { label: '5 miles → km', value: convert(5, 'miles', 'kilometers') },
  { label: '1 foot → inches', value: convert(1, 'feet', 'inches') },
  { label: '1 nmi → meters', value: convert(1, 'nauticalMiles', 'meters') },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nitro Measurements</Text>
      {results.map((r) => (
        <Text key={r.label} style={styles.row}>
          {r.label}: {r.value}
        </Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    fontSize: 18,
    marginVertical: 4,
  },
});
