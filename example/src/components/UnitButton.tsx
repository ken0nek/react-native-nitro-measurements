import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

interface Props {
  unitName: string
  symbol: string
  onPress: () => void
}

export function UnitButton({ unitName, symbol, onPress }: Props) {
  const theme = useTheme()

  return (
    <Pressable
      style={[styles.button, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
      onPress={onPress}
    >
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {unitName}
      </Text>
      <Text style={[styles.symbol, { color: theme.textSecondary }]}>{symbol}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  name: {
    fontSize: 14,
    flex: 1,
  },
  symbol: {
    fontSize: 14,
  },
})
