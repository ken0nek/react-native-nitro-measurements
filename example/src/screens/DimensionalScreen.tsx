import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import {
  getCategories,
  getUnitsForCategory,
  getSymbol,
  multiply,
  divide,
  resolveDimension,
  type AnyUnit,
  type UnitCategory,
  type DimensionalResult,
  type MeasurementResult,
} from 'react-native-nitro-measurements'
import { useTheme } from '../hooks/useTheme'
import { camelToTitle, formatNumber, CATEGORY_DISPLAY_NAMES } from '../constants'
import { NumericInput } from '../components/NumericInput'
import { UnitButton } from '../components/UnitButton'
import { AllUnitsPickerModal } from '../components/PickerModal'
import { ResultCard } from '../components/ResultCard'
import { DimensionBadge } from '../components/DimensionBadge'
import { OperationToggle } from '../components/OperationToggle'

type PickerTarget = 'a' | 'b' | 'resolve' | null

export function DimensionalScreen() {
  const theme = useTheme()
  const categories = useMemo(() => getCategories(), [])

  const allSections = useMemo(
    () =>
      categories.map((cat) => ({
        category: cat,
        units: getUnitsForCategory(cat),
      })),
    [categories]
  )

  const [operation, setOperation] = useState(0) // 0=Multiply, 1=Divide
  const [valueA, setValueA] = useState('60')
  const [valueB, setValueB] = useState('2')
  const [unitA, setUnitA] = useState<AnyUnit>('kilometersPerHour')
  const [unitB, setUnitB] = useState<AnyUnit>('hours')
  const [targetUnit, setTargetUnit] = useState<AnyUnit>('kilometers')
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null)

  const dimResult = useMemo((): { data: DimensionalResult | null; error: string | undefined } => {
    const numA = parseFloat(valueA)
    const numB = parseFloat(valueB)
    if (!valueA || !valueB || isNaN(numA) || isNaN(numB)) return { data: null, error: undefined }
    try {
      const fn = operation === 0 ? multiply : divide
      const r = fn(numA, unitA, numB, unitB)
      return { data: r, error: undefined }
    } catch (e: any) {
      return { data: null, error: e.message }
    }
  }, [valueA, valueB, unitA, unitB, operation])

  const resolvedResult = useMemo((): {
    data: MeasurementResult | null
    error: string | undefined
  } => {
    if (!dimResult.data) return { data: null, error: undefined }
    try {
      const r = resolveDimension(dimResult.data.value, dimResult.data.dimensions, targetUnit)
      if (!r) return { data: null, error: 'Dimension mismatch — target unit has incompatible dimensions' }
      return { data: r, error: undefined }
    } catch (e: any) {
      return { data: null, error: e.message }
    }
  }, [dimResult.data, targetUnit])

  const opSymbol = operation === 0 ? '\u00D7' : '\u00F7'

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
        <View style={styles.section}>
          <OperationToggle
            options={['Multiply', 'Divide']}
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

        {/* Dimensional Result */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Dimensional Result</Text>
          {dimResult.error ? (
            <ResultCard value={null} error={dimResult.error} />
          ) : dimResult.data ? (
            <View style={[styles.dimCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={[styles.dimValue, { color: theme.text }]}>
                {formatNumber(dimResult.data.value)}
              </Text>
              <Text style={[styles.dimSiLabel, { color: theme.textSecondary }]}>
                (SI base units)
              </Text>
              <DimensionBadge
                dimensions={dimResult.data.dimensions}
                label={dimResult.data.dimensionLabel}
              />
            </View>
          ) : (
            <ResultCard value={null} />
          )}
        </View>

        {/* Resolve Section */}
        {dimResult.data ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Resolve to Unit</Text>
            <View style={{ marginBottom: 8 }}>
              <UnitButton
                unitName={camelToTitle(targetUnit)}
                symbol={getSymbol(targetUnit)}
                onPress={() => setPickerTarget('resolve')}
              />
            </View>
            <ResultCard
              value={resolvedResult.data?.value ?? null}
              symbol={resolvedResult.data?.symbol}
              category={
                resolvedResult.data
                  ? CATEGORY_DISPLAY_NAMES[resolvedResult.data.category]
                  : undefined
              }
              error={resolvedResult.error}
            />
          </View>
        ) : null}
      </ScrollView>

      <AllUnitsPickerModal
        visible={pickerTarget !== null}
        sections={allSections}
        onSelect={(unit) => {
          if (pickerTarget === 'a') setUnitA(unit)
          else if (pickerTarget === 'b') setUnitB(unit)
          else if (pickerTarget === 'resolve') setTargetUnit(unit)
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dimCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  dimValue: {
    fontSize: 28,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  dimSiLabel: {
    fontSize: 12,
  },
})
