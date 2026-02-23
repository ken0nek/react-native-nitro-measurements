import React from 'react'
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native'
import type { UnitCategory } from 'react-native-nitro-measurements'
import { useTheme } from '../hooks/useTheme'
import { CATEGORY_DISPLAY_NAMES } from '../constants'

interface Props {
  categories: UnitCategory[]
  selected: UnitCategory
  onSelect: (category: UnitCategory) => void
}

export function CategoryPicker({ categories, selected, onSelect }: Props) {
  const theme = useTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {categories.map((cat) => {
        const isSelected = cat === selected
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? theme.primary : theme.surface,
                borderColor: isSelected ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#FFFFFF' : theme.text },
              ]}
            >
              {CATEGORY_DISPLAY_NAMES[cat] || cat}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
})
