import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../constants/screens';
import LoginScreen       from '../screens/LoginScreen';
import SignUpScreen      from '../screens/SignUpScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.LOGIN}        component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGN_UP}      component={SignUpScreen} />
      <Stack.Screen name={SCREENS.CONFIRM_CODE} component={ConfirmCodeScreen} />
    </Stack.Navigator>
  );
}
