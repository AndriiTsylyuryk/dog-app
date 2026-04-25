import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { SCREENS } from '../constants/screens';

export default function SignUpScreen({ navigation }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [agreed, setAgreed]     = useState(false);

  const isValid = name && email && password && password === confirm && agreed;

  return (
    <View style={styles.root}>
      <Header
        title="Sign up"
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sub}>Create an account to get started</Text>

        <InputField label="Owner name"     value={name}     onChangeText={setName}     placeholder="Luc" />
        <InputField label="Email Address"  value={email}    onChangeText={setEmail}    placeholder="name@email.com" inputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }} />
        <InputField label="Password"       value={password} onChangeText={setPassword} placeholder="Create a password" secureText />
        <InputField label="Confirm password" value={confirm} onChangeText={setConfirm} placeholder="Confirm password" secureText />

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(v => !v)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>
            I've read and agree with the{' '}
            <Text style={styles.link}>Terms and Conditions</Text>
            {' '}and the{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Create account"
          onPress={() => navigation.navigate(SCREENS.CONFIRM_CODE, { email })}
          disabled={!isValid}
          style={styles.btn}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  container: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xxl },
  sub: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginBottom: SPACING.lg },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.xl, gap: SPACING.sm },
  checkbox: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 1.5, borderColor: COLORS.grayBorder,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkmark: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  checkLabel: { flex: 1, fontSize: FONT_SIZE.sm, color: COLORS.gray, lineHeight: 20 },
  link: { color: COLORS.primary },
  btn: { marginTop: SPACING.sm },
});
