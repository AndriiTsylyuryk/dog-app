import { createSlice } from '@reduxjs/toolkit';

// Завдання 3: slice для збережених собак/активностей
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    // а) Додавання — не дублює, якщо елемент вже є в списку
    addFavorite: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },

    // б) Видалення за id
    removeFavorite: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

    // в) Оновлення — очищення всього списку збережених
    clearFavorites: () => [],
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
