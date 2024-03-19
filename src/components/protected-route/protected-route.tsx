import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedInSelector } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';
import { useSelector } from '../../services/hooks';

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, needAuth }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const location = useLocation();

  if (isLoggedIn && needAuth) return element;
  if (!isLoggedIn && needAuth) return <Navigate to="/login" replace state={{ from: location }} />;
  if (isLoggedIn && !needAuth) return <Navigate to="/profile" replace state={{ from: location }} />;

  return element;
};
