import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, FONT_SIZE } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import BreedExplorerScreen from '../screens/BreedExplorerScreen';
import BreedGalleryScreen  from '../screens/BreedGalleryScreen';

const Stack = createStackNavigator();

export default function BreedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.black },
      }}
    >
      <Stack.Screen
        name={SCREENS.BREED_EXPLORER}
        component={BreedExplorerScreen}
        options={{ title: 'Breeds' }}
      />
      <Stack.Screen
        name={SCREENS.BREED_GALLERY}
        component={BreedGalleryScreen}
        options={({ route }) => ({
          title: (route.params?.breed ?? '').replace(/-/g, ' '),
        })}
      />
    </Stack.Navigator>
  );
}
