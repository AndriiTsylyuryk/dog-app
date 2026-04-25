import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import ChatListItem from '../components/ChatListItem';
import { COLORS, SPACING } from '../constants/colors';
import { CHATS } from '../data/mockData';

export default function ChatScreen() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? CHATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : CHATS;

  return (
    <View style={styles.root}>
      <View style={styles.searchWrap}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search chats..." />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={c => String(c.id)}
        renderItem={({ item }) => <ChatListItem {...item} onPress={() => {}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  searchWrap: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
});
