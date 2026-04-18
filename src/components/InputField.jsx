import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

/**
 * @param {string}   label         - мітка над полем
 * @param {string}   value
 * @param {function} onChangeText
 * @param {string}   placeholder
 * @param {boolean}  secureText    - якщо true — поле пароля з кнопкою показати/сховати
 * @param {string}   error         - текст помилки під полем
 * @param {object}   inputProps    - будь-які додаткові пропси TextInput
 */
export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureText = false,
  error,
  inputProps = {},
}) {
  const [hidden, setHidden] = useState(secureText);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.row, focused && styles.rowFocused, error && styles.rowError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />

        {/* Кнопка «Показати/сховати» тільки для поля пароля */}
        {secureText && (
          <TouchableOpacity onPress={() => setHidden(prev => !prev)} style={styles.toggle}>
            <Text style={styles.toggleText}>{hidden ? 'Показати' : 'Сховати'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    // Висота однакова на обох платформах
    height: Platform.select({ ios: 48, android: 50 }),
  },
  rowFocused: {
    borderColor: COLORS.primary,
  },
  rowError: {
    borderColor: COLORS.danger,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  toggle: {
    paddingLeft: SPACING.sm,
  },
  toggleText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  error: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.xs,
    color: COLORS.danger,
  },
});
