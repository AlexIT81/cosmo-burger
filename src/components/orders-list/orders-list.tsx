import { FC } from 'react';
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

  return (
    <section>
      {allOrders && allInitialIngredients ? (
        <ul className={`${styles['burgers-list']}`}>
          {allOrders.map((order: IOrder) => {
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
