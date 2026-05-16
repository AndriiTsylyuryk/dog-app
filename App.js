import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider }       from 'react-redux';
import { store }          from './src/redux/store';
import { ThemeProvider }  from './src/context/ThemeContext';
import { UserProvider }   from './src/context/UserContext';
import { AuthContext }    from './src/context/AuthContext';
import AuthStack          from './src/navigation/AuthStack';
import DrawerNavigator    from './src/navigation/DrawerNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = {
    login:  () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <AuthContext.Provider value={auth}>
            <NavigationContainer>
              {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
            </NavigationContainer>
          </AuthContext.Provider>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
}
