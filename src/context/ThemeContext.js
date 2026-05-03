import React, { createContext, useContext, useState } from 'react';

// Завдання 2: набори кольорів для світлої та темної теми
const THEME_COLORS = {
  light: {
    bg:      '#FFFFFF',
    surface: '#F3F4F6',
    text:    '#1A1A1A',
    subText: '#6B7280',
    border:  '#E5E7EB',
  },
  dark: {
    bg:      '#1A1A1A',
    surface: '#2A2A2A',
    text:    '#FFFFFF',
    subText: '#9CA3AF',
    border:  '#3A3A3A',
  },
};

export const ThemeContext = createContext();

// Хук для зручного доступу до теми в будь-якому компоненті
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Перемикає між темною і світлою темою
  const toggleTheme = () => setIsDark(prev => !prev);

  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
