import { FC } from 'react';
import styles from './feed.module.css';

export const Feed: FC = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Страница с лентой заказов</h1>
      </section>
    </main>
  );
};
