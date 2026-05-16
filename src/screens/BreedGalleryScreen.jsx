import React, { useState, useEffect } from 'react';
import {
  View, FlatList, Image, Text,
  StyleSheet, ActivityIndicator, useWindowDimensions,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { fetchBreedImages } from '../api/api';
import { useTheme } from '../context/ThemeContext';

const NUM_COLUMNS = 3;

export default function BreedGalleryScreen({ route }) {
  const { breed } = route.params ?? {};
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const imageSize = (width - SPACING.xs * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  useEffect(() => {
    if (!breed) { setLoading(false); return; }
    fetchBreedImages(breed, 18)
      .then(setImages)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [breed]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
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
      <FlatList
        data={images}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: imageSize, height: imageSize, borderRadius: 8 }}
            resizeMode="cover"
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subText }]}>No images found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: COLORS.danger, fontSize: FONT_SIZE.md },
  list: { padding: SPACING.xs },
  row: { gap: SPACING.xs, marginBottom: SPACING.xs },
  empty: { textAlign: 'center', marginTop: SPACING.xxl, fontSize: FONT_SIZE.md },
});
