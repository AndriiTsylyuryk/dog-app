import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import BreedCard  from '../components/BreedCard';
import SearchBar  from '../components/SearchBar';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { fetchAllBreeds } from '../api/api';
import { SCREENS } from '../constants/screens';
import { useTheme } from '../context/ThemeContext';

export default function BreedExplorerScreen({ navigation }) {
  const [breeds, setBreeds]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [search, setSearch]   = useState('');
  const { colors } = useTheme();

  useEffect(() => {
    fetchAllBreeds()
      .then(setBreeds)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => search ? breeds.filter(b => b.includes(search.toLowerCase())) : breeds,
    [search, breeds],
  );

  const handlePress = useCallback(
    breed => navigation.navigate(SCREENS.BREED_GALLERY, { breed }),
    [navigation],
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={[styles.loadingText, { color: colors.subText }]}>Loading breeds...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={styles.searchWrap}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search breeds..." />
        <Text style={[styles.count, { color: colors.subText }]}>{filtered.length} breeds</Text>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <BreedCard breedFolder={item} onPress={() => handlePress(item)} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subText }]}>No breeds match "{search}"</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  searchWrap: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  count: { fontSize: FONT_SIZE.xs, marginTop: SPACING.xs },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: SPACING.sm, fontSize: FONT_SIZE.sm },
  errorText: { color: COLORS.danger, fontSize: FONT_SIZE.md },
  empty: { textAlign: 'center', marginTop: SPACING.xxl, fontSize: FONT_SIZE.md },
});
