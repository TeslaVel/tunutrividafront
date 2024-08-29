import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isNotLogged: boolean,
  redirectPath?: string,
  children?: JSX.Element,
};

const ProtectedRoute: React.FC<Props> = ({
isNotLogged,
redirectPath,
children }: Props
) => {
  if (isNotLogged && !redirectPath) return <Navigate to={"/"} replace />;
  if (isNotLogged && redirectPath) return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
