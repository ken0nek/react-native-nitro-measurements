import React, { useState, useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { useTheme } from '../hooks/useTheme'
import { runAllSuites, formatResultsAsMarkdown } from '../benchmark/runner'
import { nitroAdapter } from '../benchmark/adapters/nitro'
import { convertUnitsAdapter } from '../benchmark/adapters/convertUnits'
import { convertPkgAdapter } from '../benchmark/adapters/convertPkg'
import { rawMathAdapter } from '../benchmark/adapters/rawMath'
import { createSimpleConversionSuite } from '../benchmark/suites/simpleConversion'
import { createBatchConversionSuite } from '../benchmark/suites/batchConversion'
import { createTemperatureSuite } from '../benchmark/suites/temperature'
import { createArithmeticSuite } from '../benchmark/suites/arithmetic'
import { BenchmarkResultTable } from '../components/BenchmarkResultTable'
import type { BenchmarkSuiteResult, BenchmarkConfig } from '../benchmark/types'

const ITERATION_OPTIONS = [100, 500, 1000, 5000] as const

type AllResults = { suiteName: string; results: BenchmarkSuiteResult[] }[]

export function BenchmarkScreen() {
  const theme = useTheme()
  const [iterations, setIterations] = useState<number>(1000)
  const [running, setRunning] = useState(false)
  const [progressText, setProgressText] = useState('')
  const [progressPercent, setProgressPercent] = useState(0)
  const [allResults, setAllResults] = useState<AllResults | null>(null)
  const configRef = useRef<BenchmarkConfig>({ iterations: 1000, warmUpIterations: 50 })

  const adapters = useMemo(
    () => [rawMathAdapter, nitroAdapter, convertUnitsAdapter, convertPkgAdapter],
    [],
  )

  const suites = useMemo(
    () => [
      createSimpleConversionSuite(adapters),
      createTemperatureSuite(adapters),
      createBatchConversionSuite(adapters),
      createArithmeticSuite([rawMathAdapter, nitroAdapter]),
    ],
    [adapters],
  )

  const handleRun = useCallback(async () => {
    setRunning(true)
    setAllResults(null)
    setProgressText('Starting...')
    setProgressPercent(0)
    configRef.current = { iterations, warmUpIterations: 50 }

    try {
      const results = await runAllSuites(suites, configRef.current, (progress) => {
        const pct = ((progress.suiteIndex + progress.caseIndex / progress.totalCases) / progress.totalSuites)
        setProgressPercent(pct)
        setProgressText(`${progress.suiteName}: ${progress.libraryName}`)
      })

      setAllResults(results)
      setProgressPercent(1)
      setProgressText('Done')
    } catch (e: any) {
      Alert.alert('Benchmark Error', e.message)
    } finally {
      setRunning(false)
    }
  }, [iterations, suites])

  const handleCopy = useCallback(async () => {
    if (!allResults) return
    const markdown = formatResultsAsMarkdown(allResults, configRef.current)
    await Clipboard.setStringAsync(markdown)
    Alert.alert('Copied', 'Benchmark results copied to clipboard as markdown.')
  }, [allResults])

  // Count collapsed sections
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>({})
  const toggleSuite = useCallback((name: string) => {
    setExpandedSuites((prev) => ({ ...prev, [name]: !prev[name] }))
  }, [])

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.text }]}>Performance Benchmarks</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Compare nitro-measurements vs JS libraries
        </Text>
      </View>

      {/* Iteration selector */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Iterations per case</Text>
        <View style={styles.iterRow}>
          {ITERATION_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => !running && setIterations(opt)}
              style={[
                styles.iterOption,
                {
                  backgroundColor: opt === iterations ? theme.primary : theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.iterText,
                  { color: opt === iterations ? '#FFFFFF' : theme.text },
                ]}
              >
                {opt.toLocaleString()}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Run / Copy buttons */}
      <View style={styles.section}>
        <View style={styles.buttonRow}>
          <Pressable
            onPress={handleRun}
            disabled={running}
            style={[
              styles.button,
              styles.runButton,
              { backgroundColor: running ? theme.border : theme.primary },
            ]}
          >
            <Text style={styles.buttonText}>
              {running ? 'Running...' : 'Run All'}
            </Text>
          </Pressable>
          {allResults && (
            <Pressable
              onPress={handleCopy}
              style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }]}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>Copy Results</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Progress bar */}
      {running && (
        <View style={styles.section}>
          <View style={[styles.progressTrack, { backgroundColor: theme.inputBackground }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: theme.primary, width: `${Math.round(progressPercent * 100)}%` },
              ]}
            />
          </View>
          <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
            {progressText}
          </Text>
        </View>
      )}

      {/* Results */}
      {allResults?.map((suite) => {
        const isExpanded = expandedSuites[suite.suiteName] !== false // default expanded
        return (
          <View key={suite.suiteName} style={styles.section}>
            <Pressable
              onPress={() => toggleSuite(suite.suiteName)}
              style={styles.suiteHeader}
            >
              <Text style={[styles.suiteName, { color: theme.text }]}>
                {isExpanded ? '▼' : '▶'} {suite.suiteName}
              </Text>
            </Pressable>
            {isExpanded &&
              suite.results.map((caseResult) => (
                <BenchmarkResultTable
                  key={caseResult.caseName}
                  caseResult={caseResult}
                />
              ))}
          </View>
        )
      })}

      {/* Empty state */}
      {!running && !allResults && (
        <View style={styles.section}>
          <View style={[styles.emptyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Tap "Run All" to start benchmarks.{'\n'}
              For accurate results, run on a physical device.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
  },
  iterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iterOption: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  iterText: {
    fontSize: 13,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  runButton: {
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  suiteHeader: {
    paddingVertical: 6,
  },
  suiteName: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
})
