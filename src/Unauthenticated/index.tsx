import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App as AntDesignApp } from 'antd';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:resetToken',
    element: <ResetPassword />,
  },

  {
    path: '/*',
    element: <Navigate to="/" />,
  },
]);

// const queryClient = new QueryClient();

const UnauthenticatedApp = () => (
  // <QueryClientProvider client={queryClient}>
  <AntDesignApp>
    <RouterProvider router={router} />
  </AntDesignApp>
  // </QueryClientProvider>
);
export default UnauthenticatedApp;
