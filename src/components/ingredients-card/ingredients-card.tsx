import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-card.module.css';
import { getAllBurgerParts } from '../../services/selectors';
import { IIngredient } from '../../utils/types';

export const IngredientsCard: FC<IIngredient> = (ingredient) => {
  const {type, _id: id, image_large: image, name, price} = ingredient;
  const location = useLocation();

  // DnD
  const ingredientType = type === 'bun' ? 'bun' : 'filling';

  const [_, dragRef] = useDrag({
    type: ingredientType,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // Счетчик
  const allBurgerParts = useSelector((state) => getAllBurgerParts(state));

  const counter = useMemo<number>(() => {
    return allBurgerParts.reduce((acc, item) => {
      if (item === null) return acc;
      return item._id === id ? (acc += 1) : acc;
    }, 0);
  }, [allBurgerParts]);

  return (
    <Link to={`/ingredients/${id}`} state={{ backgroundLocation: location }} className={styles.link}>
      <li className={styles.card} role="tab" ref={dragRef}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles['price-wrapper']}>
          <span className="text text_type_digits-medium">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
        {!!counter && <Counter count={counter} size="default" extraClass={styles.counter} />}
      </li>
    </Link>
  );
};