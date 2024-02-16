import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import image from '../../images/404.webp';

export const NotFound404 = () => {
  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <img src={image} alt="Страница не найдена" className={styles.image} />
        <Link to="/" className={styles.link}>
          Перейти на главную
        </Link>
      </section>
    </main>
  );
};
