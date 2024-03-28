import { FC } from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done.svg';
import { Preloader } from '../preloader/preloader';
import { getOrderErrorSelector, getOrderSelector, getOrderRequestActiveSelector } from '../../services/selectors';
import { useSelector } from '../../services/hooks';

export const OrderDetails: FC = () => {
  const order = useSelector(getOrderSelector);
  const isLoading = useSelector(getOrderRequestActiveSelector);
  const apiError = useSelector(getOrderErrorSelector);

  return (
    <div className={styles.wrapper}>
      {apiError && <p className="text text_type_main-medium">Ошибка сервера. Пожалуйста, повторите заказ позднее...</p>}
      {!apiError && isLoading && <Preloader />}
      {!apiError && !isLoading && order.number && (
        <>
          <h1 className={`${styles.title}`}>{order.number}</h1>
          <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
          <img src={doneIcon} alt="Заказ оформлен" className={styles.icon} />
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
};
