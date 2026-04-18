import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/colors';

/**
 * @param {string}   value
 * @param {function} onChangeText
 * @param {string}   placeholder
 * @param {function} onSubmit      - викликається при натисканні Enter або кнопки пошуку
 */
export default function SearchBar({ value, onChangeText, placeholder = 'Search...', onSubmit }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      {/* Іконка пошуку — Unicode щоб не підключати бібліотеку іконок */}
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Кнопка очищення — з'являється тільки коли є текст */}
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: Platform.select({ ios: 46, android: 48 }),
  },
  containerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  icon: {
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  clearBtn: {
    padding: SPACING.xs,
  },
  clearText: {
    color: COLORS.gray,
    fontSize: FONT_SIZE.sm,
  },
});
