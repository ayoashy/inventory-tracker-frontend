import { AuthProvider, useAuth } from './context/AuthContext';
import UnauthenticatedApp from './Unauthenticated';
import AdminApp from './Admin';
import { AuthDataContext } from './context/authDataContext';
import { QueryClient, QueryClientProvider } from 'react-query';


const SelectApp = () => {
  console.log('shouting from select app');
  
  const data = useAuth();
  // if (!data) return <UnauthenticatedApp />;

  let app;

  if (data){
    app = <AdminApp />
  }
  else{
    app = <UnauthenticatedApp />
  }

  console.log(app);
  
  // if (data?.user.type === 'admin') {
  //   app = <AdminApp />;
  // } else if (data?.user.type === 'sales') {
  //   return <h1 className="">this is sales app</h1>;
  // }

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
