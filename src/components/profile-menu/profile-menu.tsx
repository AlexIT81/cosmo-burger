import { FC } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import styles from './profile-menu.module.css';
import { logoutAction } from '../../services/actions/user/logout';
import { useDispatch } from '../../services/hooks';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    <Navigate to="/login" replace />;
  };

  return (
    <div className={styles['navigation-block']}>
      <nav className="mb-20">
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link
              to="/profile"
              className={pathname === '/profile' ? `${styles.link} ${styles.link_active}` : `${styles.link}`}
            >
              Профиль
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to="/profile/orders"
              className={pathname === '/profile/orders' ? `${styles.link} ${styles.link_active}` : `${styles.link}`}
            >
              История заказов
            </Link>
          </li>
          <li className={styles.item}>
            <button type="button" className={`${styles.button}`} onClick={logout}>
              Выход
            </button>
          </li>
        </ul>
      </nav>
      <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
};
