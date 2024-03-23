import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserDataLoading, isLoggedInSelector } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { Preloader } from '../preloader/preloader';

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, needAuth }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const isLoading = useSelector(getUserDataLoading);
  const location = useLocation();

  if (isLoading) return <Preloader />;
  if (!isLoggedIn && needAuth) return <Navigate to="/login" state={{ from: location }} replace />;
  if (isLoggedIn && !needAuth)
    return <Navigate to={location.state?.from || '/profile'} replace />;
  return element;
};
