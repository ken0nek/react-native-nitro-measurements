import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import type { BenchmarkSuiteResult } from '../benchmark/types'

interface Props {
  caseResult: BenchmarkSuiteResult
}

function formatOps(opsPerSec: number): string {
  if (opsPerSec > 1e6) return `${(opsPerSec / 1e6).toFixed(1)}M`
  if (opsPerSec > 1e3) return `${(opsPerSec / 1e3).toFixed(1)}K`
  return opsPerSec.toFixed(0)
}

function formatMs(ms: number): string {
  if (ms < 0.001) return `${(ms * 1000).toFixed(1)}μs`
  if (ms < 1) return `${ms.toFixed(4)}ms`
  return `${ms.toFixed(2)}ms`
}

export function BenchmarkResultTable({ caseResult }: Props) {
  const theme = useTheme()
  const rawMath = caseResult.results.find((r) => r.library === 'Raw Math')

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={[styles.caseName, { color: theme.text }]}>{caseResult.caseName}</Text>

      {/* Header row */}
      <View style={[styles.row, styles.headerRow, { borderBottomColor: theme.border }]}>
        <View style={styles.libraryCellView}>
          <Text style={[styles.headerText, { color: theme.textSecondary }]}>Library</Text>
        </View>
        <Text style={[styles.numCellText, { color: theme.textSecondary }]}>Median</Text>
        <Text style={[styles.numCellText, { color: theme.textSecondary }]}>Ops/sec</Text>
        <Text style={[styles.numCellText, { color: theme.textSecondary }]}>vs Raw</Text>
        <Text style={[styles.numCellText, { color: theme.textSecondary }]}>p95</Text>
      </View>

      {caseResult.results.map((result) => {
        const ratio = rawMath && rawMath.stats.median > 0
          ? result.stats.median / rawMath.stats.median
          : null
        const ratioStr = result.library === 'Raw Math'
          ? '1.0x'
          : ratio !== null
            ? `${ratio.toFixed(1)}x`
            : '—'

        return (
          <View
            key={result.library}
            style={[styles.row, { borderBottomColor: theme.border }]}
          >
            <View style={styles.libraryCellView}>
              <Text style={[styles.libraryText, { color: theme.text }]} numberOfLines={1}>
                {result.library}
              </Text>
              {!result.correct && (
                <View style={[styles.badge, { backgroundColor: theme.error }]}>
                  <Text style={styles.badgeText}>WRONG</Text>
                </View>
              )}
            </View>
            <Text style={[styles.numCellText, styles.mono, { color: theme.text }]}>
              {formatMs(result.stats.median)}
            </Text>
            <Text style={[styles.numCellText, styles.mono, { color: theme.text }]}>
              {formatOps(result.stats.opsPerSec)}
            </Text>
            <Text style={[styles.numCellText, styles.mono, { color: theme.textSecondary }]}>
              {ratioStr}
            </Text>
            <Text style={[styles.numCellText, styles.mono, { color: theme.textSecondary }]}>
              {formatMs(result.stats.p95)}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  caseName: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    paddingVertical: 4,
  },
  headerText: {
    fontSize: 11,
  },
  libraryCellView: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  numCellText: {
    flex: 1,
    fontSize: 11,
    textAlign: 'right',
  },
  libraryText: {
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  mono: {
    fontVariant: ['tabular-nums'],
  },
  badge: {
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
})
