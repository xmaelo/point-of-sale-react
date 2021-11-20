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
import Order from './pages/Order';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Menu from './pages/Menu';

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector(p => p.role && p.role.task_name &&  p.role.task_name !== "serveur")
  return useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: auth ? <Navigate to="/dashboard/order" replace /> : <Navigate to="/login" /> },
        { path: 'menu', element: auth ?<Menu /> : <Navigate to="/login" />},
        { path: 'table', element: auth ? <User />: <Navigate to="/login" /> },
        { path: 'products', element: auth ?<Products /> : <Navigate to="/login" /> },
        { path: 'order', element: auth ?<Order /> : <Navigate to="/login" /> },
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

