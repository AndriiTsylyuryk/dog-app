import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { PARKS } from '../data/mockData';
import { SCREENS } from '../constants/screens';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.resultBar}>
        <Text style={styles.resultText}>{PARKS.length * 72} results</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapLabel}>🗺️ Map View</Text>
        <Text style={styles.mapSub}>Tap a park below to see details</Text>
      </View>

      <FlatList
        data={PARKS}
        keyExtractor={p => String(p.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(SCREENS.PARK_DETAILS, { park: item })}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.isFree ? 'Free to come' : 'Paid entry'}
                {item.smallBreeds ? ' · Small breeds' : ''}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  resultBar: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: COLORS.grayLight },
  resultText: { fontSize: FONT_SIZE.sm, color: COLORS.gray },
  mapPlaceholder: {
    height: 180, backgroundColor: '#E8F0FE',
    alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder,
  },
  mapLabel: { fontSize: FONT_SIZE.xl, marginBottom: 4 },
  mapSub: { fontSize: FONT_SIZE.sm, color: COLORS.gray },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.black },
  itemMeta: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginTop: 2 },
  chevron: { fontSize: FONT_SIZE.xl, color: COLORS.textSecondary },
});
