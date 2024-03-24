import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedInSelector } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { Preloader } from '../preloader/preloader';

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  element,
  needAuth,
  backgroundLocation = false,
}) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const location = useLocation();

  if (backgroundLocation && !isLoggedIn) return <Preloader />;
  if (!isLoggedIn && needAuth) return <Navigate to="/login" state={{ from: location }} replace />;
  if (isLoggedIn && !needAuth) return <Navigate to={location.state?.from || '/profile'} replace />;
  return element;
};
