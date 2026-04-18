import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from './src/constants/colors';

import CustomButton  from './src/components/CustomButton';
import InputField    from './src/components/InputField';
import ActivityCard  from './src/components/ActivityCard';
import SearchBar     from './src/components/SearchBar';
import ChatListItem  from './src/components/ChatListItem';
import Header        from './src/components/Header';
import CategoryList  from './src/components/CategoryList';

const CATEGORIES = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Walking' },
  { id: 3, label: 'Training' },
  { id: 4, label: 'Grooming' },
  { id: 5, label: 'Vet' },
];

const ACTIVITIES = [
  {
    id: 1,
    title: 'Friday walk with dogs',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    price: '$25',
    date: 'Friday, 10:00',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Walking at Marry house',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    price: '$18',
    date: 'Saturday, 09:00',
    rating: 4.5,
  },
];

const CHATS = [
  {
    id: 1,
    name: 'Helen Grace',
    avatarUrl: 'https://i.pravatar.cc/100?img=1',
    lastMessage: 'Ok I will be there in 10 min',
    time: '14:32',
    unread: 2,
  },
  {
    id: 2,
    name: 'Brooke Serra',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    lastMessage: 'Can we reschedule for tomorrow?',
    time: '12:10',
    unread: 0,
  },
  {
    id: 3,
    name: 'Jamie Brad',
    avatarUrl: 'https://i.pravatar.cc/100?img=8',
    lastMessage: 'Your dog is so cute!',
    time: 'Yesterday',
    unread: 5,
  },
];

export default function App() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState(1);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="DogApp"
        rightAction={<Text style={styles.menuIcon}>☰</Text>}
      />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* ── SearchBar ── */}
        <Section label="SearchBar">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search dog services..."
          />
        </Section>

        {/* ── CategoryList ── */}
        <Section label="CategoryList">
          <CategoryList
            categories={CATEGORIES}
            activeId={category}
            onSelect={setCategory}
          />
        </Section>

        {/* ── ActivityCard ── */}
        <Section label="ActivityCard">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
            {ACTIVITIES.map(a => (
              <ActivityCard key={a.id} {...a} onPress={() => {}} />
            ))}
          </ScrollView>
        </Section>

        {/* ── ChatListItem ── */}
        <Section label="ChatListItem">
          {CHATS.map(c => (
            <ChatListItem key={c.id} {...c} onPress={() => {}} />
          ))}
        </Section>

        {/* ── InputField ── */}
        <Section label="InputField">
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            inputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureText
          />
        </Section>

        {/* ── CustomButton ── */}
        <Section label="CustomButton">
          <CustomButton title="Login"   onPress={() => {}} style={styles.btnGap} />
          <CustomButton title="Sign Up" onPress={() => {}} variant="outline" style={styles.btnGap} />
          <CustomButton title="Log Out" onPress={() => {}} variant="danger"  style={styles.btnGap} />
          <CustomButton title="Loading" onPress={() => {}} loading style={styles.btnGap} />
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    paddingBottom: SPACING.xxl,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  cardRow: {
    marginLeft: -SPACING.lg,
    paddingLeft: SPACING.lg,
  },
  btnGap: {
    marginBottom: SPACING.sm,
  },
  menuIcon: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.black,
  },
});
