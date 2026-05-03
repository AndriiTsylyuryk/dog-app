import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
// Завдання 2: отримуємо стан теми і функцію перемикання
import { useTheme } from '../context/ThemeContext';

const MENU_ITEMS = ['Language', 'Privacy & Security', 'Storage'];

export default function SettingsScreen() {
  const [showLogout, setShowLogout] = useState(false);
  const { logout }                  = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>L</Text>
        </View>
        <Text style={[styles.profileName, { color: colors.text }]}>Lucas Scott</Text>
      </View>

      {/* Завдання 2: перемикач теми — застосовує ThemeContext */}
      <View style={[styles.item, { borderBottomColor: colors.border }]}>
        <Text style={[styles.itemText, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: COLORS.grayBorder, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View>

      {MENU_ITEMS.map(item => (
        <TouchableOpacity key={item} style={[styles.item, { borderBottomColor: colors.border }]}>
          <Text style={[styles.itemText, { color: colors.text }]}>{item}</Text>
          <Text style={[styles.chevron, { color: colors.subText }]}>›</Text>
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
  root: { flex: 1 },
  profile: { alignItems: 'center', paddingVertical: SPACING.xl },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  profileName: { fontSize: FONT_SIZE.lg, fontWeight: '700' },
  item: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  itemText: { fontSize: FONT_SIZE.md },
  chevron: { fontSize: FONT_SIZE.xl },
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
