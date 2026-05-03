import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import MainTabs        from './MainTabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import DrawerContent   from '../screens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 260 },
        drawerActiveTintColor: COLORS.primary,
        overlayColor: COLORS.overlay,
      }}
    >
      <Drawer.Screen name={SCREENS.MAIN_TABS}  component={MainTabs} />
      <Drawer.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
        options={{ headerShown: true, title: 'Saved Dogs', headerStyle: { backgroundColor: COLORS.white }, headerTitleStyle: { fontWeight: '700' } }}
      />
    </Drawer.Navigator>
  );
}
