import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-id.module.css';
import { IOrder } from '../../utils/types';
import { getInrgedientsSelector } from '../../services/selectors';
import { useSelector } from '../../services/hooks';
import { Preloader } from '../../components/preloader/preloader';
import { OrderIngredient } from '../../components/order-ingredient/order-ingredient';
import { getOrderInfoRequest } from '../../utils/api';

export const FeedId: FC = () => {
  const { id } = useParams<string>();
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const allInitialIngredients = useSelector(getInrgedientsSelector);

  useMemo(() => {
    if (id) {
      getOrderInfoRequest(id).then((res) => setCurrentOrder(res.orders[0]));
    }
  }, [id]);

  // Группировка поторяющихся ингредиентов для отправки на отрисовку
  const orderIngredientsSortedArray = useMemo(() => {
    if (currentOrder) {
      const count: any = {};
      currentOrder!.ingredients.forEach((i) => {
        count[i] = (count[i] || 0) + 1;
      });
      return Object.entries(count);
    }
    return null;
  }, [currentOrder]);

  const getInrgedientInfo = (ingredient: string) => {
    const info = { name: '', image: '', price: 0 };
    const currentItem = allInitialIngredients.find((item) => item._id === ingredient);
    if (currentItem) {
      info.name = currentItem.name;
      info.image = currentItem.image_mobile;
      info.price = currentItem.price;
    }
    return info;
  };

  // Итоговая стоимость
  const totalPrice = useMemo(() => {
    if (currentOrder) {
      return currentOrder!.ingredients.reduce((acc, ingredient) => {
        const currentItem = allInitialIngredients.find((item) => item._id === ingredient);
        if (currentItem) return acc + currentItem.price;
        return acc;
      }, 0);
    }
    return 0;
  }, [currentOrder]);

  // Статус заказа
  const getStatus = () => {
    if (currentOrder) {
      if (currentOrder.status === 'created') {
        return <span className={styles.status}>Создан</span>;
      }
      if (currentOrder.status === 'pending') {
        return <span className={styles.status}>Готовится</span>;
      }
      if (currentOrder.status === 'done') {
        return <span className={`${styles.status} ${styles.done}`}>Выполнен</span>;
      }
    }
    return null;
  };

  return (
    <main className={styles.main}>
      {currentOrder && orderIngredientsSortedArray ? (
        <section className={styles.order}>
          <span className={styles.number}>#{currentOrder.number}</span>
          <h1 className="text text_type_main-medium mb-3">{currentOrder.name}</h1>
          {getStatus()}
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={styles.wrapper}>
            {orderIngredientsSortedArray.map((item) => {
              const currentIngredientData = getInrgedientInfo(item[0]);
              return (
                <OrderIngredient
                  key={currentIngredientData.image}
                  name={currentIngredientData.name}
                  image={currentIngredientData.image}
                  price={currentIngredientData.price}
                  quantity={item[1] as number}
                />
              );
            })}
          </ul>
          <div className={`${styles['total-wrapper']}`}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(currentOrder.createdAt)} />
            </p>
            <div className={`${styles['price-wrapper']}`}>
              <span className={styles.price}>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </main>
  );
};
