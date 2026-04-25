import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, FONT_SIZE } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import MainScreen            from '../screens/MainScreen';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black },
      }}
    >
      <Stack.Screen
        name={SCREENS.MAIN}
        component={MainScreen}
        options={{ title: 'DogApp 🐾' }}
      />
      <Stack.Screen
        name={SCREENS.ACTIVITY_DETAILS}
        component={ActivityDetailsScreen}
        options={({ route }) => ({ title: route.params?.activity?.title ?? 'Details' })}
      />
    </Stack.Navigator>
  );
}
