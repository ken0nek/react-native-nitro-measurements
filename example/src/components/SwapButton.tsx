import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

interface Props {
  onPress: () => void
}

export function SwapButton({ onPress }: Props) {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '40' }]}
    >
      <Text style={[styles.icon, { color: theme.primary }]}>⇅</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 20,
  },
})
