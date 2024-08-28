import { createContext, useContext } from 'react';
import { UserType } from './AuthContext';

export const AuthDataContext = createContext<UserType | undefined>(undefined);

export const useAuthData = () => {
  const value = useContext(AuthDataContext);
  if (!value) {
    throw new Error(
      'Auth Context must be used within AuthDataContext Provider',
    );
  } else {
    return value;
  }
};
