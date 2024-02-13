import { Link, useLocation } from 'react-router-dom';
import styles from './profile-menu.module.css';

export const ProfileMenu = () => {
  const { pathname } = useLocation();
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
            <Link to="/logout" className={`${styles.link}`}>
              Выход
            </Link>
          </li>
        </ul>
      </nav>
      <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
};
