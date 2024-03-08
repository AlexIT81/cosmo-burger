import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, needAuth }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const location = useLocation();

  if (isLoggedIn && needAuth) return element;
  if (!isLoggedIn && needAuth) return <Navigate to="/login" replace state={{ from: location }} />;
  if (isLoggedIn && !needAuth) return <Navigate to="/profile" replace state={{ from: location }} />;

  return element;
};
