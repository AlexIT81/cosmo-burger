import { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { wsConnectionStart } from '../../services/actions/wsActions';
import { useDispatch } from '../../services/hooks';
import { getCookie } from '../../utils/cookie'
import { WS_URL } from '../../utils/constants';

export const Feed: FC = () => {
  const accessToken = getCookie('accessToken');
  const wsUserUrl = `${WS_URL}?token=${accessToken}`
  const wsAllUrl = `${WS_URL}/all`

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wsConnectionStart(wsAllUrl))
  }, [])

  return (
    <main>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Страница с лентой заказов</h1>
      </section>
    </main>
  );
};
