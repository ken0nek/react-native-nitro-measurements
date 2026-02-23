import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

const SI_LABELS = ['L', 'M', 'T', 'I', '\u0398', 'N', 'J']

const SUPERSCRIPTS: Record<string, string> = {
  '-1': '\u207B\u00B9',
  '-2': '\u207B\u00B2',
  '-3': '\u207B\u00B3',
  '2': '\u00B2',
  '3': '\u00B3',
  '4': '\u2074',
}

interface Props {
  dimensions: number[]
  label: string
}

export function DimensionBadge({ dimensions, label }: Props) {
  const theme = useTheme()

  const chips = dimensions
    .map((exp, i) => (exp !== 0 ? { label: SI_LABELS[i]!, exp } : null))
    .filter(Boolean) as { label: string; exp: number }[]

  return (
    <View style={styles.container}>
      <View style={styles.chips}>
        {chips.length > 0 ? (
          chips.map((c) => (
            <View
              key={c.label}
              style={[styles.chip, { backgroundColor: theme.primary + '20' }]}
            >
              <Text style={[styles.chipText, { color: theme.primary }]}>
                {c.label}
                {c.exp !== 1 ? SUPERSCRIPTS[String(c.exp)] || `^${c.exp}` : ''}
              </Text>
            </View>
          ))
        ) : (
          <View style={[styles.chip, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.chipText, { color: theme.primary }]}>dimensionless</Text>
          </View>
        )}
      </View>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
  },
})
