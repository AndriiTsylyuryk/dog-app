import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { SCREENS } from '../constants/screens';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Welcome to DogApp🐾!</Text>

      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        inputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
      />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureText
      />

      <TouchableOpacity style={styles.forgotWrap}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <CustomButton title="Login" onPress={login} style={styles.btn} />

      <Text style={styles.register}>
        Not a member?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate(SCREENS.SIGN_UP)}>
          Register now
        </Text>
      </Text>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>Or continue with</Text>
      </View>

      <View style={styles.socialRow}>
        {['G', '🍎', 'f'].map(icon => (
          <TouchableOpacity key={icon} style={styles.socialBtn}>
            <Text style={styles.socialIcon}>{icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
    backgroundColor: COLORS.white,
  },
  image: { width: 160, height: 140, borderRadius: 16, marginBottom: SPACING.xl },
  title: { fontSize: FONT_SIZE.xxl, fontWeight: '700', color: COLORS.black, marginBottom: SPACING.xl, textAlign: 'center' },
  forgotWrap: { alignSelf: 'flex-start', marginBottom: SPACING.md },
  forgot: { color: COLORS.primary, fontSize: FONT_SIZE.sm },
  btn: { width: '100%', marginBottom: SPACING.md },
  register: { fontSize: FONT_SIZE.sm, color: COLORS.gray, marginTop: SPACING.sm },
  link: { color: COLORS.primary, fontWeight: '600' },
  divider: { marginVertical: SPACING.lg },
  dividerText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm },
  socialRow: { flexDirection: 'row', gap: SPACING.md },
  socialBtn: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 1, borderColor: COLORS.grayBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  socialIcon: { fontSize: FONT_SIZE.md, fontWeight: '700' },
});
