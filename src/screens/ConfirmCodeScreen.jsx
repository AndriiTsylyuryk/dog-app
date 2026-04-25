import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const CODE_LENGTH = 4;

export default function ConfirmCodeScreen({ navigation, route }) {
  const { email = '' } = route.params ?? {};
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const { login } = useAuth();

  const handleChange = (text, index) => {
    const next = [...code];
    next[index] = text.slice(-1);
    setCode(next);
    if (text && index < CODE_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isFull = code.every(c => c !== '');

  return (
    <View style={styles.root}>
      <Header title="Enter confirmation code" showBack onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {email ? (
          <Text style={styles.sub}>A 4-digit code was sent to{'\n'}<Text style={styles.email}>{email}</Text></Text>
        ) : null}

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={r => (inputs.current[i] = r)}
              style={[styles.cell, digit && styles.cellFilled]}
              value={digit}
              onChangeText={t => handleChange(t, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendWrap}>
          <Text style={styles.resend}>Resend code</Text>
        </TouchableOpacity>

        <CustomButton title="Continue" onPress={login} disabled={!isFull} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SPACING.xl, paddingTop: SPACING.xxl, alignItems: 'center' },
  sub: { fontSize: FONT_SIZE.sm, color: COLORS.gray, textAlign: 'center', marginBottom: SPACING.xl, lineHeight: 20 },
  email: { color: COLORS.black, fontWeight: '600' },
  codeRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl },
  cell: {
    width: 56, height: 56, borderRadius: 12,
    borderWidth: 1.5, borderColor: COLORS.grayBorder,
    fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.black,
    backgroundColor: COLORS.grayLight,
  },
  cellFilled: { borderColor: COLORS.primary, backgroundColor: COLORS.white },
  resendWrap: { marginBottom: SPACING.xl },
  resend: { color: COLORS.primary, fontSize: FONT_SIZE.sm, fontWeight: '600' },
});
