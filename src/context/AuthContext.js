import { createContext, useContext } from 'react';

export const AuthContext = createContext({ login: () => {}, logout: () => {} });
export const useAuth = () => useContext(AuthContext);
