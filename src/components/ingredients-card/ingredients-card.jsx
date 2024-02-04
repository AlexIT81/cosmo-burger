import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredients-card.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import { addIngredient } from '../../services/actions/ingredient';
import { getAllBurgerParts } from '../../utils/constants';

export const IngredientsCard = ({ ingredient, handleModalIngredient }) => {
  const dispatch = useDispatch();

  const onModalIngredient = () => {
    dispatch(addIngredient(ingredient));
    handleModalIngredient();
  };

  // DnD
  const ingredientType = ingredient.type === 'bun' ? 'bun' : 'filling';

  const [{ isDrag }, dragRef] = useDrag({
    type: ingredientType,
    item: ingredient,
    // collect: (monitor) => ({
    //   isDrag: monitor.isDragging(),
    // }),
  });

  // Счетчик
  const allBurgerParts = useSelector(state => getAllBurgerParts(state));
  const counter = allBurgerParts.reduce((acc, item) => {
    return item._id === ingredient._id ? acc += 1 : acc
  }, 0)

  return (
    <li className={styles.card} onClick={onModalIngredient} role="tab" ref={dragRef}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <div className={styles['price-wrapper']}>
        <span className="text text_type_digits-medium">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{ingredient.name}</h3>
      {!!counter && <Counter count={counter} size="default" extraClass={styles.counter} />}
    </li>
  );
};

IngredientsCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  handleModalIngredient: PropTypes.func.isRequired,
};
