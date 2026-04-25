import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

export default function ActivityCard({ title, imageUrl, price, date, rating, onPress }) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{price}</Text>
          {rating != null && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginRight: SPACING.md,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: '100%',
    height: 110,
  },
  body: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  ratingBadge: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 6,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray,
  },
  date: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
});
