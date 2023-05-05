import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isLogged: boolean,
  redirectPath?: string,
  children?: JSX.Element,
};

const ProtectedRoute = ({
isLogged,
redirectPath,
children }: Props
) => {
  if (isLogged && redirectPath) return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
