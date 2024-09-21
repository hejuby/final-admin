import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLogin =
    parseInt(sessionStorage.getItem('login') ?? '0', 10) > new Date().valueOf();

  if (isLogin) {
    navigate('/login');
  }

  return <Outlet />;
};

export default PrivateRoute;
