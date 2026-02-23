import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { formatNumber } from '../constants'

interface Props {
  value: number | null
  symbol?: string
  category?: string
  error?: string
}

export function ResultCard({ value, symbol, category, error }: Props) {
  const theme = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      {error ? (
        <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
      ) : value !== null ? (
        <>
          <Text style={[styles.value, { color: theme.text }]}>
            {formatNumber(value)}
            {symbol ? ` ${symbol}` : ''}
          </Text>
          {category ? (
            <Text style={[styles.category, { color: theme.textSecondary }]}>{category}</Text>
          ) : null}
        </>
      ) : (
        <Text style={[styles.placeholder, { color: theme.textSecondary }]}>
          Enter values to see result
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    minHeight: 64,
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  category: {
    fontSize: 13,
    marginTop: 4,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 14,
  },
})
