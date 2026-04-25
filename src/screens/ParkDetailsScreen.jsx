import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

export default function ParkDetailsScreen({ route, navigation }) {
  const { park } = route.params ?? {};

  if (!park) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Park not found.</Text>
        <CustomButton title="Go back" onPress={() => navigation.goBack()} style={{ marginTop: SPACING.lg }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.mapStub}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapLabel}>{park.name}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{park.name}</Text>
        <Text style={styles.tag}>{park.isFree ? 'Free to come' : 'Paid entry'}</Text>

        <Text style={styles.sectionLabel}>About</Text>
        <Text style={styles.desc}>{park.description}</Text>

        <View style={styles.tagsRow}>
          {park.smallBreeds && <View style={styles.pill}><Text style={styles.pillText}>Small breeds</Text></View>}
          <View style={styles.pill}><Text style={styles.pillText}>{park.isFree ? 'Free' : 'Paid'}</Text></View>
        </View>

        <CustomButton title="See details" onPress={() => navigation.goBack()} style={styles.btn} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: SPACING.xxl },
  mapStub: {
    height: 200, backgroundColor: '#E8F0FE',
    alignItems: 'center', justifyContent: 'center',
  },
  mapIcon: { fontSize: 40 },
  mapLabel: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginTop: SPACING.sm },
  body: { padding: SPACING.lg },
  name: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  tag: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginBottom: SPACING.lg },
  sectionLabel: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  desc: { fontSize: FONT_SIZE.md, color: COLORS.gray, lineHeight: 22, marginBottom: SPACING.lg },
  tagsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.xl },
  pill: { backgroundColor: COLORS.grayLight, borderRadius: 20, paddingHorizontal: SPACING.md, paddingVertical: 6 },
  pillText: { fontSize: FONT_SIZE.sm, color: COLORS.gray },
  btn: {},
  error: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  errorText: { fontSize: FONT_SIZE.lg, color: COLORS.danger },
});
