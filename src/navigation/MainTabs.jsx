import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { COLORS, FONT_SIZE } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import MainStack      from './MainStack';
import MapStack       from './MapStack';
import ChatScreen     from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  [SCREENS.MAIN_STACK]: '🏠',
  [SCREENS.MAP_STACK]:  '🗺️',
  [SCREENS.CHAT]:       '💬',
  [SCREENS.SETTINGS]:   '⚙️',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { borderTopColor: COLORS.grayBorder },
        tabBarLabelStyle: { fontSize: FONT_SIZE.xs, fontWeight: '600' },
        tabBarIcon: () => (
          <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name]}</Text>
        ),
      })}
    >
      <Tab.Screen name={SCREENS.MAIN_STACK} component={MainStack}      options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={SCREENS.MAP_STACK}  component={MapStack}       options={{ tabBarLabel: 'Map' }} />
      <Tab.Screen name={SCREENS.CHAT}       component={ChatScreen}     options={{ tabBarLabel: 'Chat', title: 'Chats', headerShown: true, headerStyle: { backgroundColor: COLORS.white }, headerTitleStyle: { fontSize: FONT_SIZE.lg, fontWeight: '700' } }} />
      <Tab.Screen name={SCREENS.SETTINGS}   component={SettingsScreen} options={{ tabBarLabel: 'Settings', headerShown: false }} />
    </Tab.Navigator>
  );
}
