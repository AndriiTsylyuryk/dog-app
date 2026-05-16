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
// Завдання 2: Reanimated для анімації масштабування при натисканні
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

function ActivityCard({ title, imageUrl, price, date, rating, onPress }) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  // Завдання 2: shared value — зберігається поза JS-потоком для плавної анімації
  const scale = useSharedValue(1);

  // Завдання 2: анімований стиль обчислюється на UI-потоці без JS bridge
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    // Завдання 2: Animated.View — компонент, що підтримує анімовані стилі Reanimated
    <Animated.View style={[styles.card, { width: cardWidth }, animStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.93, { damping: 14 }); }}
        onPressOut={() => { scale.value = withSpring(1,    { damping: 14 }); }}
        activeOpacity={1}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

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
    </Animated.View>
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

// Завдання 3: React.memo — не перерендерює картку, якщо пропси не змінились
export default React.memo(ActivityCard);
