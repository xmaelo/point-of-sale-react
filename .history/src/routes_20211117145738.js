import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector(p => p.role && p.role.task_name &&  p.role.task_name !== "serveur")
  return useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: auth ? <Navigate to="/dashboard/app" replace /> : <Navigate to="/login" /> },
        { path: 'app', element: auth ?<DashboardApp /> : <Navigate to="/login" />},
        { path: 'user', element: auth ? <User />: <Navigate to="/login" /> },
        { path: 'products', element: auth ?<Products /> : <Navigate to="/login" /> },
        { path: 'blog', element: auth ? <Blog /> : <Navigate to="/login" /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}


