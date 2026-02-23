import React, { useState, useMemo } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { getSymbol, type AnyUnit, type UnitCategory } from 'react-native-nitro-measurements'
import { useTheme } from '../hooks/useTheme'
import { camelToTitle, CATEGORY_DISPLAY_NAMES } from '../constants'

interface SingleCategoryProps {
  visible: boolean
  units: AnyUnit[]
  onSelect: (unit: AnyUnit) => void
  onClose: () => void
}

interface AllUnitsSection {
  category: UnitCategory
  units: AnyUnit[]
}

interface AllUnitsProps {
  visible: boolean
  sections: AllUnitsSection[]
  onSelect: (unit: AnyUnit) => void
  onClose: () => void
}

export function PickerModal({ visible, units, onSelect, onClose }: SingleCategoryProps) {
  const theme = useTheme()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return units
    const q = search.toLowerCase()
    return units.filter(
      (u) => u.toLowerCase().includes(q) || getSymbol(u).toLowerCase().includes(q)
    )
  }, [units, search])

  const handleSelect = (unit: AnyUnit) => {
    setSearch('')
    onSelect(unit)
  }

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>Select Unit</Text>
          <Pressable onPress={handleClose}>
            <Text style={[styles.close, { color: theme.primary }]}>Done</Text>
          </Pressable>
        </View>
        <TextInput
          style={[
            styles.search,
            { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
          ]}
          placeholder="Search units..."
          placeholderTextColor={theme.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              style={[styles.row, { borderBottomColor: theme.border }]}
              onPress={() => handleSelect(item)}
            >
              <Text style={[styles.rowText, { color: theme.text }]}>{camelToTitle(item)}</Text>
              <Text style={[styles.rowSymbol, { color: theme.textSecondary }]}>
                {getSymbol(item)}
              </Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  )
}

export function AllUnitsPickerModal({ visible, sections, onSelect, onClose }: AllUnitsProps) {
  const theme = useTheme()
  const [search, setSearch] = useState('')

  const filteredSections = useMemo(() => {
    if (!search) {
      return sections.map((s) => ({
        title: CATEGORY_DISPLAY_NAMES[s.category] || camelToTitle(s.category),
        data: s.units,
      }))
    }
    const q = search.toLowerCase()
    return sections
      .map((s) => ({
        title: CATEGORY_DISPLAY_NAMES[s.category] || camelToTitle(s.category),
        data: s.units.filter(
          (u) => u.toLowerCase().includes(q) || getSymbol(u).toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.data.length > 0)
  }, [sections, search])

  const handleSelect = (unit: AnyUnit) => {
    setSearch('')
    onSelect(unit)
  }

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>Select Unit</Text>
          <Pressable onPress={handleClose}>
            <Text style={[styles.close, { color: theme.primary }]}>Done</Text>
          </Pressable>
        </View>
        <TextInput
          style={[
            styles.search,
            { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
          ]}
          placeholder="Search all units..."
          placeholderTextColor={theme.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        <SectionList
          sections={filteredSections}
          keyExtractor={(item) => item}
          keyboardShouldPersistTaps="handled"
          renderSectionHeader={({ section }) => (
            <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
              <Text style={[styles.sectionTitle, { color: theme.primary }]}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.row, { borderBottomColor: theme.border }]}
              onPress={() => handleSelect(item)}
            >
              <Text style={[styles.rowText, { color: theme.text }]}>{camelToTitle(item)}</Text>
              <Text style={[styles.rowSymbol, { color: theme.textSecondary }]}>
                {getSymbol(item)}
              </Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  close: {
    fontSize: 16,
    fontWeight: '600',
  },
  search: {
    margin: 12,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    fontSize: 16,
    flex: 1,
  },
  rowSymbol: {
    fontSize: 14,
    marginLeft: 8,
  },
})
