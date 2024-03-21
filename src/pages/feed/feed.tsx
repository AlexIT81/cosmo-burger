import { FC, useEffect, useState } from 'react';
import styles from './feed.module.css';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../utils/cookie';
import { ORDERS_IN_COLUMN, WS_URL } from '../../utils/constants';
import {
  getAllOrdersSelector,
  getAllOrdersQuantitySelector,
  getTodayOrdersQuantitySelector,
  getInrgedientsSelector,
} from '../../services/selectors';
import { IOrder } from '../../utils/types';
import { Preloader } from '../../components/preloader/preloader';
import { OrdersList } from '../../components/orders-list/orders-list';

export const Feed: FC = () => {
  // const accessToken = getCookie('accessToken');
  // const wsUserUrl = `${WS_URL}?token=${accessToken}`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartAction(`${WS_URL}/all`));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [WS_URL, dispatch]);

  const allOrders = useSelector(getAllOrdersSelector);
  const allOrdersQuantity = useSelector(getAllOrdersQuantitySelector);
  const todayOrdersQuantity = useSelector(getTodayOrdersQuantitySelector);
  const allInitialIngredients = useSelector(getInrgedientsSelector);

  const [readyOrdersSplit, setReadyOrdersSplit] = useState<IOrder[][]>();
  const [pendingOrdersSplit, setPendingOrders] = useState<IOrder[][]>();

  const sliceIntoChunks = (arr: IOrder[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  useEffect(() => {
    if (allOrders) {
      const readyOrders = allOrders?.filter((order) => order.status === 'done');
      const pendingOrders = allOrders?.filter((order) => order.status === 'pending' || order.status === 'created');
      setReadyOrdersSplit(sliceIntoChunks(readyOrders, ORDERS_IN_COLUMN));
      setPendingOrders(sliceIntoChunks(pendingOrders, ORDERS_IN_COLUMN));
    }
  }, [allOrders]);

  return (
    <main className={styles.main}>
      {allInitialIngredients && allOrders && readyOrdersSplit && pendingOrdersSplit ? (
        <>
          <h1 className={styles.title}>Лента заказов</h1>
          <div className={styles.wrapper}>
            <OrdersList />
            <section className={`${styles['orders-info']}`}>
              <div className={`${styles['orders-wrapper']}`}>
                <div>
                  <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                  <div className={`${styles['orders-list-wrapper']}`}>
                    {readyOrdersSplit[0] &&
                      readyOrdersSplit.map((arr) => {
                        return (
                          <ul key={arr[0]._id} className={`${styles['orders-list']}`}>
                            {arr.map((order) => (
                              <li key={order._id} className={styles.ready}>
                                {order.number}
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                  <div className={`${styles['orders-list-wrapper']}`}>
                    {pendingOrdersSplit[0] &&
                      pendingOrdersSplit.map((arr) => {
                        return (
                          <ul key={arr[0]._id} className={`${styles['orders-list']}`}>
                            {arr.map((order) => (
                              <li key={order._id} className={styles.ready}>
                                {order.number}
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                  </div>
                </div>
              </div>
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <span className="text text_type_digits-large mb-15">{allOrdersQuantity}</span>
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <span className="text text_type_digits-large">{todayOrdersQuantity}</span>
            </section>
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
};
