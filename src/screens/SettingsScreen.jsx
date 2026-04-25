import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const MENU_ITEMS = ['Appearance', 'Language', 'Privacy & Security', 'Storage'];

export default function SettingsScreen() {
  const [showLogout, setShowLogout] = useState(false);
  const { logout } = useAuth();

  return (
    <View style={styles.root}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>L</Text>
        </View>
        <Text style={styles.profileName}>Lucas Scott</Text>
      </View>

      {MENU_ITEMS.map(item => (
        <TouchableOpacity key={item} style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}

      <CustomButton
        title="Log out"
        variant="danger"
        onPress={() => setShowLogout(true)}
        style={styles.logoutBtn}
      />

      <Modal visible={showLogout} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setShowLogout(false)}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Log out</Text>
            <Text style={styles.dialogMsg}>Are you sure you want to log out? You'll need to log again to use the app.</Text>
            <View style={styles.dialogBtns}>
              <CustomButton title="Cancel" variant="outline" onPress={() => setShowLogout(false)} style={styles.dialogBtn} />
              <CustomButton title="Log out" variant="danger" onPress={logout} style={styles.dialogBtn} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.black },
  profile: { alignItems: 'center', paddingVertical: SPACING.xl },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  profileName: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  item: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: '#2A2A2A',
  },
  itemText: { color: COLORS.white, fontSize: FONT_SIZE.md },
  chevron: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xl },
  logoutBtn: { margin: SPACING.xl },
  overlay: { flex: 1, backgroundColor: COLORS.overlay, alignItems: 'center', justifyContent: 'center' },
  dialog: {
    width: 300, backgroundColor: COLORS.white,
    borderRadius: 16, padding: SPACING.xl,
  },
  dialogTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  dialogMsg: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginBottom: SPACING.xl, lineHeight: 20 },
  dialogBtns: { flexDirection: 'row', gap: SPACING.sm },
  dialogBtn: { flex: 1 },
});
