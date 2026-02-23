import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  getCategories,
  getUnitsForCategory,
  getSymbol,
  add,
  subtract,
  type AnyUnit,
  type UnitCategory,
} from 'react-native-nitro-measurements'
import { useTheme } from '../hooks/useTheme'
import { camelToTitle, formatNumber } from '../constants'
import { CategoryPicker } from '../components/CategoryPicker'
import { NumericInput } from '../components/NumericInput'
import { UnitButton } from '../components/UnitButton'
import { PickerModal } from '../components/PickerModal'
import { ResultCard } from '../components/ResultCard'
import { OperationToggle } from '../components/OperationToggle'

type PickerTarget = 'a' | 'b' | 'result' | null

export function ArithmeticScreen() {
  const theme = useTheme()
  const categories = useMemo(() => getCategories(), [])

  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(categories[0]!)
  const [operation, setOperation] = useState(0) // 0=Add, 1=Subtract
  const [valueA, setValueA] = useState('1')
  const [valueB, setValueB] = useState('1')
  const [unitA, setUnitA] = useState<AnyUnit>(() => getUnitsForCategory(categories[0]!)[0]!)
  const [unitB, setUnitB] = useState<AnyUnit>(() => getUnitsForCategory(categories[0]!)[1] ?? getUnitsForCategory(categories[0]!)[0]!)
  const [resultUnit, setResultUnit] = useState<AnyUnit>(() => getUnitsForCategory(categories[0]!)[0]!)
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null)

  const units = useMemo(() => getUnitsForCategory(selectedCategory), [selectedCategory])

  const handleCategoryChange = useCallback((cat: UnitCategory) => {
    setSelectedCategory(cat)
    const catUnits = getUnitsForCategory(cat)
    setUnitA(catUnits[0]!)
    setUnitB(catUnits[1] ?? catUnits[0]!)
    setResultUnit(catUnits[0]!)
  }, [])

  const result = useMemo((): { value: number | null; error: string | undefined } => {
    const numA = parseFloat(valueA)
    const numB = parseFloat(valueB)
    if (!valueA || !valueB || isNaN(numA) || isNaN(numB)) return { value: null, error: undefined }
    try {
      const fn = operation === 0 ? add : subtract
      const r = fn(numA, unitA as any, numB, unitB as any, resultUnit as any)
      return { value: r, error: undefined }
    } catch (e: any) {
      return { value: null, error: e.message }
    }
  }, [valueA, valueB, unitA, unitB, resultUnit, operation])

  const opSymbol = operation === 0 ? '+' : '\u2212'

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <CategoryPicker
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />

        <View style={styles.section}>
          <OperationToggle
            options={['Add', 'Subtract']}
            selected={operation}
            onSelect={setOperation}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.inputCol}>
              <NumericInput label="Value A" value={valueA} onChangeText={setValueA} />
            </View>
            <View style={styles.unitCol}>
              <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>Unit A</Text>
              <UnitButton
                unitName={camelToTitle(unitA)}
                symbol={getSymbol(unitA)}
                onPress={() => setPickerTarget('a')}
              />
            </View>
          </View>
        </View>

        <Text style={[styles.opSymbol, { color: theme.primary }]}>{opSymbol}</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.inputCol}>
              <NumericInput label="Value B" value={valueB} onChangeText={setValueB} />
            </View>
            <View style={styles.unitCol}>
              <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>Unit B</Text>
              <UnitButton
                unitName={camelToTitle(unitB)}
                symbol={getSymbol(unitB)}
                onPress={() => setPickerTarget('b')}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.resultLabel, { color: theme.textSecondary }]}>Result Unit</Text>
          <UnitButton
            unitName={camelToTitle(resultUnit)}
            symbol={getSymbol(resultUnit)}
            onPress={() => setPickerTarget('result')}
          />
        </View>

        <View style={styles.section}>
          <ResultCard
            value={result.value}
            symbol={result.value !== null ? getSymbol(resultUnit) : undefined}
            error={result.error}
          />
        </View>
      </ScrollView>

      <PickerModal
        visible={pickerTarget !== null}
        units={units}
        onSelect={(unit) => {
          if (pickerTarget === 'a') setUnitA(unit)
          else if (pickerTarget === 'b') setUnitB(unit)
          else if (pickerTarget === 'result') setResultUnit(unit)
          setPickerTarget(null)
        }}
        onClose={() => setPickerTarget(null)}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
    gap: 12,
  },
  section: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputCol: {
    flex: 1,
  },
  unitCol: {
    flex: 1,
  },
  unitLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  opSymbol: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
})
