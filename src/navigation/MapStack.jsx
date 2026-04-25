import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, FONT_SIZE } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import MapScreen         from '../screens/MapScreen';
import ParkDetailsScreen from '../screens/ParkDetailsScreen';

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black },
      }}
    >
      <Stack.Screen
        name={SCREENS.MAP}
        component={MapScreen}
        options={{ title: 'Dog Parks' }}
      />
      <Stack.Screen
        name={SCREENS.PARK_DETAILS}
        component={ParkDetailsScreen}
        options={({ route }) => ({ title: route.params?.park?.name ?? 'Park Details' })}
      />
    </Stack.Navigator>
  );
}
