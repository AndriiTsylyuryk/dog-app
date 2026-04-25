import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ActivityCard from '../components/ActivityCard';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { ACTIVITIES } from '../data/mockData';
import { SCREENS } from '../constants/screens';

const CATEGORIES = [
  { id: 1, label: 'Dog Parks' },
  { id: 2, label: 'Today Walk' },
  { id: 3, label: 'Chat' },
];

export default function MainScreen({ navigation }) {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState(1);

  const filtered = search
    ? ACTIVITIES.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    : ACTIVITIES;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search dog services..." />
      <CategoryList categories={CATEGORIES} activeId={category} onSelect={setCategory} />

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Near you</Text>
          <TouchableOpacity><Text style={styles.seeMore}>See more</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
          {filtered.map(activity => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onPress={() => navigation.navigate(SCREENS.ACTIVITY_DETAILS, { activity })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your events</Text>
        {filtered.map(activity => (
          <TouchableOpacity
            key={activity.id}
            style={styles.eventRow}
            onPress={() => navigation.navigate(SCREENS.ACTIVITY_DETAILS, { activity })}
          >
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{activity.title}</Text>
              <Text style={styles.eventLocation}>{activity.location}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: SPACING.xxl },
  section: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.black },
  seeMore: { fontSize: FONT_SIZE.sm, color: COLORS.primary },
  cardRow: { marginLeft: -SPACING.lg, paddingLeft: SPACING.lg },
  eventRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder,
  },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.black },
  eventLocation: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginTop: 2 },
  chevron: { fontSize: FONT_SIZE.xl, color: COLORS.textSecondary },
});
