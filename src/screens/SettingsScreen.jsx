import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField   from '../components/InputField';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth }  from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useUser }  from '../context/UserContext';

const MENU_ITEMS = ['Language', 'Privacy & Security', 'Storage'];

export default function SettingsScreen() {
  const [showLogout,  setShowLogout]  = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { logout }                  = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();
  const { profile, updateProfile }  = useUser();

  const [draft, setDraft] = useState(profile);

  const openEdit = () => { setDraft(profile); setShowProfile(true); };
  const saveEdit = () => { updateProfile(draft); setShowProfile(false); };

  return (
    <ScrollView style={[styles.root, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.profile} onPress={openEdit} activeOpacity={0.8}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(profile.ownerName || 'U')[0].toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.profileName, { color: colors.text }]}>{profile.ownerName}</Text>
        {profile.dogName ? (
          <Text style={[styles.dogInfo, { color: colors.subText }]}>
            🐶 {profile.dogName}{profile.dogBreed ? ` · ${profile.dogBreed}` : ''}
          </Text>
        ) : (
          <Text style={[styles.editHint, { color: colors.subText }]}>Tap to add your dog →</Text>
        )}
      </TouchableOpacity>

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

      {/* Модальне вікно редагування профілю */}
      <Modal visible={showProfile} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowProfile(false)}>
          <TouchableOpacity style={styles.sheet} activeOpacity={1}>
            <Text style={styles.sheetTitle}>Edit Profile</Text>
            <InputField label="Owner name" value={draft.ownerName} onChangeText={v => setDraft(p => ({ ...p, ownerName: v }))} placeholder="Your name" />
            <InputField label="Dog name"   value={draft.dogName}   onChangeText={v => setDraft(p => ({ ...p, dogName: v }))}   placeholder="Dog's name" />
            <InputField label="Dog breed"  value={draft.dogBreed}  onChangeText={v => setDraft(p => ({ ...p, dogBreed: v }))}  placeholder="e.g. labrador" />
            <View style={styles.sheetBtns}>
              <CustomButton title="Cancel" variant="outline" onPress={() => setShowProfile(false)} style={styles.sheetBtn} />
              <CustomButton title="Save"   onPress={saveEdit} style={styles.sheetBtn} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Модальне вікно підтвердження виходу */}
      <Modal visible={showLogout} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setShowLogout(false)}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Log out</Text>
            <Text style={styles.dialogMsg}>Are you sure you want to log out? You'll need to log again to use the app.</Text>
            <View style={styles.dialogBtns}>
              <CustomButton title="Cancel"   variant="outline" onPress={() => setShowLogout(false)} style={styles.dialogBtn} />
              <CustomButton title="Log out"  variant="danger"  onPress={logout}                     style={styles.dialogBtn} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
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
  avatarText:  { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  profileName: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: 4 },
  dogInfo:     { fontSize: FONT_SIZE.sm, marginTop: 2 },
  editHint:    { fontSize: FONT_SIZE.sm, marginTop: 2 },
  item: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  itemText: { fontSize: FONT_SIZE.md },
  chevron:  { fontSize: FONT_SIZE.xl },
  logoutBtn: { margin: SPACING.xl },
  overlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: SPACING.xl, paddingBottom: 40,
  },
  sheetTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.lg },
  sheetBtns:  { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  sheetBtn:   { flex: 1 },
  dialog: {
    width: 300, backgroundColor: COLORS.white,
    borderRadius: 16, padding: SPACING.xl,
    alignSelf: 'center', marginBottom: 200,
  },
  dialogTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.sm },
  dialogMsg:   { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginBottom: SPACING.xl, lineHeight: 20 },
  dialogBtns:  { flexDirection: 'row', gap: SPACING.sm },
  dialogBtn:   { flex: 1 },
});
