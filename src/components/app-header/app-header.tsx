import { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={`${styles['header-menu__list']}`}>
          <li className={`${styles['header-menu__item']} pt-4 pr-5 pb-4 pl-5`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles['header-menu__link']} ${styles['header-menu__link_active']}`
                  : `${styles['header-menu__link']}`
              }
            >
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
              <span className="text text_type_main-default">Конструктор</span>
            </NavLink>
          </li>
          <li className={`${styles['header-menu__item']} pt-4 pr-5 pb-4 pl-5`}>
            <NavLink
              to="/feed"
              className={
                pathname === '/feed'
                  ? `${styles['header-menu__link']} ${styles['header-menu__link_active']}`
                  : `${styles['header-menu__link']}`
              }
            >
              <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
              <span className="text text_type_main-default">Лента заказов</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <ul className={`${styles['header-menu__list_type_profile']} ${styles['header-menu__list']}`}>
          <li className={`${styles['header-menu__item']} pt-4 pr-5 pb-4 pl-5`}>
            <Link
              to="/profile"
              className={
                pathname.includes('/profile')
                  ? `${styles['header-menu__link']} ${styles['header-menu__link_active']}`
                  : `${styles['header-menu__link']}`
              }
            >
              <ProfileIcon type={pathname.includes('/profile') ? 'primary' : 'secondary'} />
              <span className="text text_type_main-default">Личный кабинет</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
