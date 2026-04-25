import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

export default function ActivityDetailsScreen({ route, navigation }) {
  const { activity } = route.params ?? {};

  if (!activity) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Activity not found.</Text>
        <CustomButton title="Go back" onPress={() => navigation.goBack()} style={{ marginTop: SPACING.lg }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Image source={{ uri: activity.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.body}>
        <Text style={styles.title}>{activity.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.price}>{activity.price}</Text>
          {activity.rating != null && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>★ {activity.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.date}>{activity.date}</Text>
        {activity.location ? <Text style={styles.location}>📍 {activity.location}</Text> : null}

        <Text style={styles.descLabel}>About</Text>
        <Text style={styles.desc}>{activity.description}</Text>

        <CustomButton title="Join event" onPress={() => navigation.goBack()} style={styles.btn} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: SPACING.xxl },
  image: { width: '100%', height: 240 },
  body: { padding: SPACING.lg },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  price: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.primary },
  badge: { backgroundColor: COLORS.grayLight, borderRadius: 8, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  badgeText: { fontSize: FONT_SIZE.sm, color: COLORS.gray },
  date: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginBottom: 4 },
  location: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginBottom: SPACING.lg },
  descLabel: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  desc: { fontSize: FONT_SIZE.md, color: COLORS.gray, lineHeight: 22, marginBottom: SPACING.xl },
  btn: { marginTop: SPACING.sm },
  error: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  errorText: { fontSize: FONT_SIZE.lg, color: COLORS.danger },
});
