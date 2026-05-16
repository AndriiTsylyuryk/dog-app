import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState({
    ownerName: 'Lucas Scott',
    dogName:   '',
    dogBreed:  '',
  });

  const updateProfile = updates =>
    setProfile(prev => ({ ...prev, ...updates }));

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}
