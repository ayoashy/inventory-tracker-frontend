import { createContext, useContext, useEffect, useState } from 'react';
import Loader from '../common/Loader';
import { useGetUserApi } from '../data/hooks/auth';

type UserContextType = {
  email: string;
  name: string;
  resetPassword?: string;
  resetPasswordExpire?: string;
  type: string;
};

export type UserType = {
  user: UserContextType | null;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<UserType | undefined>(undefined);

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [authState, setAuthState] = useState<UserType>({
    user: null,
    isLoading: true,
    error: null,
  });

  const { data, isLoading, error } = useGetUserApi();

  useEffect(() => {
    if (!isLoading) {
      setAuthState({
        user: data?.user || null,
        isLoading: false,
        error: error ? (error as Error).message || 'An error occurred' : null,
      });
    }
  }, [data, isLoading, error]);

  if (authState.isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): UserType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthProvider };