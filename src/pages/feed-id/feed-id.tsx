import { FC } from 'react';
import styles from './feed-id.module.css';
import { OrderInfo } from '../../components/order-info/order-info';

export const FeedId: FC = () => {
  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
};
