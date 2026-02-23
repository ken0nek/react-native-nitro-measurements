import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  getCategories,
  getUnitsForCategory,
  getSymbol,
  convertFull,
  type AnyUnit,
  type UnitCategory,
  type MeasurementResult,
} from 'react-native-nitro-measurements'
import { useTheme } from '../hooks/useTheme'
import { CATEGORY_DISPLAY_NAMES, camelToTitle } from '../constants'
import { CategoryPicker } from '../components/CategoryPicker'
import { NumericInput } from '../components/NumericInput'
import { UnitButton } from '../components/UnitButton'
import { PickerModal } from '../components/PickerModal'
import { ResultCard } from '../components/ResultCard'
import { SwapButton } from '../components/SwapButton'

export function ConvertScreen() {
  const theme = useTheme()
  const categories = useMemo(() => getCategories(), [])

  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(categories[0]!)
  const [fromUnit, setFromUnit] = useState<AnyUnit>(() => getUnitsForCategory(categories[0]!)[0]!)
  const [toUnit, setToUnit] = useState<AnyUnit>(() => getUnitsForCategory(categories[0]!)[1]!)
  const [inputValue, setInputValue] = useState('1')
  const [pickerTarget, setPickerTarget] = useState<'from' | 'to' | null>(null)

  const units = useMemo(() => getUnitsForCategory(selectedCategory), [selectedCategory])

  const handleCategoryChange = useCallback((cat: UnitCategory) => {
    setSelectedCategory(cat)
    const catUnits = getUnitsForCategory(cat)
    setFromUnit(catUnits[0]!)
    setToUnit(catUnits[1] ?? catUnits[0]!)
  }, [])

  const handleSwap = useCallback(() => {
    const prevFrom = fromUnit
    setFromUnit(toUnit)
    setToUnit(prevFrom)
  }, [fromUnit, toUnit])

  const result = useMemo((): { data: MeasurementResult | null; error: string | undefined } => {
    const num = parseFloat(inputValue)
    if (!inputValue || isNaN(num)) return { data: null, error: undefined }
    try {
      const r = convertFull(num, fromUnit, toUnit)
      return { data: r, error: undefined }
    } catch (e: any) {
      return { data: null, error: e.message }
    }
  }, [inputValue, fromUnit, toUnit])

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
          <NumericInput label="Value" value={inputValue} onChangeText={setInputValue} />
        </View>

        <View style={styles.section}>
          <UnitButton
            unitName={camelToTitle(fromUnit)}
            symbol={getSymbol(fromUnit)}
            onPress={() => setPickerTarget('from')}
          />
        </View>

        <SwapButton onPress={handleSwap} />

        <View style={styles.section}>
          <UnitButton
            unitName={camelToTitle(toUnit)}
            symbol={getSymbol(toUnit)}
            onPress={() => setPickerTarget('to')}
          />
        </View>

        <View style={styles.section}>
          <ResultCard
            value={result.data?.value ?? null}
            symbol={result.data?.symbol}
            category={result.data ? CATEGORY_DISPLAY_NAMES[result.data.category] : undefined}
            error={result.error}
          />
        </View>
      </ScrollView>

      <PickerModal
        visible={pickerTarget !== null}
        units={units}
        onSelect={(unit) => {
          if (pickerTarget === 'from') setFromUnit(unit)
          else setToUnit(unit)
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
})
