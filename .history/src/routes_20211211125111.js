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
import Table from './pages/Table';
import NotFound from './pages/Page404';
import Menu from './pages/Menu';
import OrderArchive from './pages/OrderArchive';
import User from './pages/User';

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector(p => p.role && true)
  const admin = useSelector(p => p.role && p.role.task_name &&  p.role.task_name === 'admin')
  return useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: auth ? <Navigate to="/dashboard/order" replace /> : <Navigate to="/login" /> },
        { path: 'menu', element: auth ?<Menu /> : <Navigate to="/login" />},
        { path: 'table', element: auth ? <Table />: <Navigate to="/login" /> },
        { path: 'products', element: auth ?<Products /> : <Navigate to="/login" /> },
        { path: 'order', element: auth ?<Order /> : <Navigate to="/login" /> },
        { path: 'blog', element: auth ? <Blog /> : <Navigate to="/login" /> },
        { path: 'archive', element: auth ? <OrderArchive /> : <Navigate to="/login" /> },
        { path: 'users', element: admin ? <User /> : <Navigate to="/dashboard" /> }
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


