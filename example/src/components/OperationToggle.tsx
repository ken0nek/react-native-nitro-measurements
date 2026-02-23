import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

interface Props {
  options: [string, string]
  selected: number
  onSelect: (index: number) => void
}

export function OperationToggle({ options, selected, onSelect }: Props) {
  const theme = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
      {options.map((label, i) => {
        const isSelected = i === selected
        return (
          <Pressable
            key={label}
            onPress={() => onSelect(i)}
            style={[
              styles.option,
              isSelected && { backgroundColor: theme.primary },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? '#FFFFFF' : theme.text },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
})
