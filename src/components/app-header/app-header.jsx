import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={`${styles['header-menu__list']}`}>
          <li className={`${styles['header-menu__item']} pt-4 pr-5 pb-4 pl-5`}>
            <a
              href="/"
              className={`${styles['header-menu__link']} ${styles['header-menu__link_active']}`}
            >
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default">Конструктор</span>
            </a>
          </li>
          <li className={`${styles['header-menu__item']} pt-4 pr-5 pb-4 pl-5`}>
            <a href="/" className={`${styles['header-menu__link']}`}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default">Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <Logo />
      <nav>
        <ul
          className={`${styles['header-menu__list_type_profile']} ${styles['header-menu__list']}`}
        >
          <li className={`${styles['header-menu__item']}`}>
            <a
              href="/"
              className={`${styles['header-menu__link']} pt-4 pr-5 pb-4 pl-5`}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default">
                Личный кабинет
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
