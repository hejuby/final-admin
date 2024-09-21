import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginForm from './components/LoginForm';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <h1>list</h1>,
          },
          {
            path: ':id',
            element: <h1>id</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
