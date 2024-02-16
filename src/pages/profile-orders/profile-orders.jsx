import styles from './profile-orders.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';

export const ProfileOrders = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <ProfileMenu />
        <div>Страница История заказов</div>
      </section>
    </main>
  );
};
