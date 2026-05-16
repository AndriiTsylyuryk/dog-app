import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar    from '../components/SearchBar';
import ChatListItem from '../components/ChatListItem';
import { COLORS, SPACING } from '../constants/colors';
import { CHATS } from '../data/mockData';

export default function ChatScreen() {
  const [search, setSearch] = useState('');

  // Завдання 3: useMemo — фільтрація перераховується лише коли змінюється search,
  // а не при будь-якому ре-рендері батьківського компонента
  const filtered = useMemo(
    () => search
      ? CHATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      : CHATS,
    [search],
  );

  // Завдання 3: useCallback — стабільна референція функції,
  // щоб SearchBar і ChatListItem не перерендерювались через нову функцію щоразу
  const handleSearch = useCallback(text => setSearch(text), []);
  const handlePress  = useCallback(() => {}, []);

  return (
    <View style={styles.root}>
      <View style={styles.searchWrap}>
        <SearchBar value={search} onChangeText={handleSearch} placeholder="Search chats..." />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={c => String(c.id)}
        renderItem={({ item }) => <ChatListItem {...item} onPress={handlePress} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  searchWrap: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
});
