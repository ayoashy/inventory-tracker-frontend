import { AuthProvider, useAuth } from './context/AuthContext';
import UnauthenticatedApp from './Unauthenticated';
import AdminApp from './Admin';
import { QueryClient, QueryClientProvider } from 'react-query';

const SelectApp: React.FC = () => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return user ? <AdminApp /> : <UnauthenticatedApp />;
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SelectApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;