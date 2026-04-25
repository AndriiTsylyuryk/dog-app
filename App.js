import 'react-native-gesture-handler'; // must be the first import for Drawer gestures to work
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './src/context/AuthContext';
import AuthStack       from './src/navigation/AuthStack';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = {
    login:  () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
