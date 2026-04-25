import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, ScrollView,
  StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import SearchBar    from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ActivityCard from '../components/ActivityCard';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { ACTIVITIES } from '../data/mockData';
import { SCREENS } from '../constants/screens';
import { fetchDogFeed } from '../api/api';

const CATEGORIES = [
  { id: 1, label: 'Dog Parks' },
  { id: 2, label: 'Today Walk' },
  { id: 3, label: 'Chat' },
];

export default function MainScreen({ navigation }) {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState(1);
  const [feed, setFeed]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetchDogFeed(10)
      .then(data => setFeed(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredFeed   = search ? feed.filter(d => d.title.includes(search.toLowerCase())) : feed;
  const filteredEvents = search ? ACTIVITIES.filter(a => a.title.toLowerCase().includes(search.toLowerCase())) : ACTIVITIES;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search breeds or events..." />
        <CategoryList categories={CATEGORIES} activeId={category} onSelect={setCategory} />
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading dogs...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      {!loading && !error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dogs near you</Text>
          <FlatList
            scrollEnabled={false}
            data={filteredFeed}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            renderItem={({ item }) => (
              <ActivityCard
                {...item}
                onPress={() => navigation.navigate(SCREENS.ACTIVITY_DETAILS, { activity: item })}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No breeds found.</Text>}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your events</Text>
        {filteredEvents.map(activity => (
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
  topBar: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  section: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  center: { paddingVertical: SPACING.xxl, alignItems: 'center' },
  loadingText: { marginTop: SPACING.sm, color: COLORS.gray, fontSize: FONT_SIZE.sm },
  errorText: { color: COLORS.danger, fontSize: FONT_SIZE.md, textAlign: 'center' },
  cardRow: { gap: SPACING.sm, marginBottom: SPACING.sm },
  emptyText: { color: COLORS.gray, fontSize: FONT_SIZE.sm, paddingVertical: SPACING.md },
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
