import { FC, useEffect, useMemo, useState } from 'react';
import styles from './feed.module.css';
import { WS_CONNECTION_CLOSED, wsConnectionStartAction } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../utils/cookie';
import { WS_URL } from '../../utils/constants';
import { BurgerItem } from '../../components/burger-item/burger-item';
import {
  getAllOrdersSelector,
  getAllOrdersQuantitySelector,
  getTodayOrdersQuantitySelector,
  getInrgedientsSelector,
  getWsConnectionStatusSelector,
} from '../../services/selectors';
import { IOrder } from '../../utils/types';
import { Preloader } from '../../components/preloader/preloader';

export const Feed: FC = () => {
  // const accessToken = getCookie('accessToken');
  // const wsUserUrl = `${WS_URL}?token=${accessToken}`;
  // const wsAllUrl = `${WS_URL}/all`;

  const [readyOrdersSplit, setReadyOrdersSplit] = useState<IOrder[]>();
  const [pendingOrdersSplit, setPendingOrders] = useState<IOrder[]>();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartAction(`${WS_URL}/all`));
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [WS_URL, dispatch]);

  const allOrdersQuantity = useSelector(getAllOrdersQuantitySelector);
  const todayOrdersQuantity = useSelector(getTodayOrdersQuantitySelector);
  const allOrders = useSelector(getAllOrdersSelector);
  const readyOrders = allOrders?.filter((order) => order.status === 'done');
  const pendingOrders = allOrders?.filter((order) => order.status === 'pending' || order.status === 'created');
  const allInitialIngredients = useSelector(getInrgedientsSelector);

  const sliceIntoChunks = (arr: any, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  useEffect(() => {
    if (readyOrders) setReadyOrdersSplit(sliceIntoChunks(readyOrders, 10))
    if (pendingOrders) setPendingOrders(sliceIntoChunks(readyOrders, 10))
  }, [])

  console.log(readyOrdersSplit)
  console.log(pendingOrders)

  const getOrderImages = (order: IOrder) => {
    const images: string[] = [];
    order.ingredients.forEach((ingredient: string) => {
      const currentItem = allInitialIngredients.find((item) => item._id === ingredient);
      if (currentItem) images.push(currentItem.image_mobile);
    });
    return images;
  };

  const getOrderPrice = (order: IOrder) => {
    let price: number = 0;
    order.ingredients.forEach((ingredient: string) => {
      const currentItem = allInitialIngredients.find((item) => item._id === ingredient);
      if (currentItem) price += currentItem.price;
    });
    return price;
  };

  return (
    <main className={styles.main}>
      {allInitialIngredients && allOrders && readyOrders && pendingOrders ? (
        <>
          <h1 className={styles.title}>Лента заказов</h1>
          <div className={styles.wrapper}>
            <section className={`${styles['burgers-info']}`}>
              <ul className={`${styles['burgers-list']}`}>
                {allInitialIngredients &&
                  allOrders &&
                  allOrders.map((order) => {
                    const images = getOrderImages(order);
                    const price = getOrderPrice(order);
                    return (
                      <BurgerItem
                        key={order._id}
                        name={order.name}
                        number={order.number}
                        data={order.createdAt}
                        images={images}
                        price={price}
                        status={order.status}
                      />
                    );
                  })}
              </ul>
            </section>
            <section className={`${styles['orders-info']}`}>
              <div className={`${styles['orders-wrapper']}`}>
                <div>
                  <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                  <ul className={`${styles['orders-list']}`}>
                    {readyOrders &&
                      readyOrders.map((order) => (
                        <li key={order._id} className={styles.ready}>
                          {order.number}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                  <ul className={`${styles['orders-list']}`}>
                    {pendingOrders &&
                      pendingOrders.map((order) => (
                        <li key={order._id} className={styles.ready}>
                          {order.number}
                        </li>
                      ))}
                  </ul>
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
