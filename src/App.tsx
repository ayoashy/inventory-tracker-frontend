import { AuthProvider, useAuth } from './context/AuthContext';
import UnauthenticatedApp from './Unauthenticated';
import AdminApp from './Admin';
import { AuthDataContext } from './context/authDataContext';
import { QueryClient, QueryClientProvider } from 'react-query';


const SelectApp = () => {
  console.log('shouting from select app');
  
  const data = useAuth();

  let app;

  if (data){
    app = <AdminApp />
  }
  else{
    app = <UnauthenticatedApp />
  }

  console.log(app);
  

  return (
    <AuthDataContext.Provider value={data}>{app}</AuthDataContext.Provider>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SelectApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
