import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App as AntDesignApp } from 'antd';

import DefaultLayout from '../layout/DefaultLayout';
import ECommerce from '../pages/Dashboard/ECommerce';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import DisplayProduct from '../pages/Dashboard/DisplayProducts';
import { AuthProvider } from '../context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <ECommerce />,
        index: true,
      },
      {
        path: '/products',
        element: <DisplayProduct />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/*',
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to="/" />,
  },
]);

// const queryClient = new QueryClient();

const AdminApp = () => (
  <AntDesignApp>
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* </AuthProvider> */}
  </AntDesignApp>
);
export default AdminApp;
