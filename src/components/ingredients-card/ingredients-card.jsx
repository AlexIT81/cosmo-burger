import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredients-card.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import { addIngredient } from '../../services/actions/ingredient';
import { getAllBurgerParts } from '../../services/selectors';

export const IngredientsCard = ({ ingredient }) => {
  const location = useLocation();

  // DnD
  const ingredientType = ingredient.type === 'bun' ? 'bun' : 'filling';

  const [_, dragRef] = useDrag({
    type: ingredientType,
    item: ingredient,
    // collect: (monitor) => ({
    //   isDrag: monitor.isDragging(),
    // }),
  });

  // Счетчик
  const allBurgerParts = useSelector((state) => getAllBurgerParts(state));

  const counter = useMemo(() => {
    return allBurgerParts.reduce((acc, item) => {
      if (item === null) return acc;
      return item._id === ingredient._id ? (acc += 1) : acc;
    }, 0);
  }, [allBurgerParts]);

  return (
    // <li className={styles.card} onClick={onModalIngredient} role="tab" ref={dragRef}>
    <Link to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} className={styles.link}>
      <li className={styles.card} role="tab" ref={dragRef}>
        <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
        <div className={styles['price-wrapper']}>
          <span className="text text_type_digits-medium">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.name} text text_type_main-default`}>{ingredient.name}</h3>
        {!!counter && <Counter count={counter} size="default" extraClass={styles.counter} />}
      </li>
    </Link>
  );
};

IngredientsCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
