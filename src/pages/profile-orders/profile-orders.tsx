import { FC } from 'react';
import styles from './profile-orders.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';

export const ProfileOrders: FC = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <ProfileMenu />
        <div>Страница История заказов</div>
      </section>
    </main>
  );
};
