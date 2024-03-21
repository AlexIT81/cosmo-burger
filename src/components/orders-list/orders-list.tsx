import { FC, useMemo } from 'react';
import styles from './orders-list.module.css';
import { useSelector } from '../../services/hooks';
import { BurgerItem } from '../burger-item/burger-item';
import { getAllOrdersSelector, getInrgedientsSelector } from '../../services/selectors';
import { IOrder } from '../../utils/types';
import { Preloader } from '../preloader/preloader';

export const OrdersList: FC = () => {
  const allOrders = useSelector(getAllOrdersSelector);
  const allInitialIngredients = useSelector(getInrgedientsSelector);

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

  // Простая проверка заказа полученного по ws
  const checkedOrders = useMemo(() => {
    if (allOrders) {
      return allOrders.reduce((result: IOrder[], order: IOrder) => {
        if (
          typeof order.number === 'number' &&
          typeof order._id === 'string' &&
          order._id.length > 0 &&
          typeof order.status === 'string' &&
          order.status.length > 0 &&
          typeof order.name === 'string' &&
          order.name.length > 0 &&
          typeof order.createdAt === 'string' &&
          order.createdAt.length > 0 &&
          Array.isArray(order.ingredients) &&
          order.ingredients.length
        ) {
          result.push(order);
        }
        return result;
      }, []);
    }
    return [];
  }, [allOrders]);

  return (
    <section>
      {allOrders && checkedOrders.length && allInitialIngredients ? (
        <ul className={`${styles['burgers-list']}`}>
          {checkedOrders.map((order: IOrder) => {
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
      ) : (
        <Preloader />
      )}
    </section>
  );
};
