import React, { useContext } from 'react';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-card.module.css';
import { IngredientsDataContext } from '../../services/ingredientsContext';

export const ConstructorCard = ({
  id,
  isDraggable,
  isLocked,
  name,
  price,
  img,
  type,
}) => {
  const { ingredientsData, setIngredientsData } = useContext(IngredientsDataContext);

  const onDelete = () => {
    setIngredientsData({ ...ingredientsData, ingredients: ingredientsData.ingredients.filter((item) => item._id !== id)})
  }

  return (
    <div className={styles.card}>
      <span className={styles.draggable}>{isDraggable && <DragIcon type='primary' />}</span>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={img}
        handleClose={onDelete}
      />
    </div>
  );
};

ConstructorCard.propTypes = {
  id: PropTypes.string,
  isDraggable: PropTypes.bool,
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string,
};

ConstructorCard.defaultProps = {
  id: '',
  isDraggable: true,
  isLocked: false,
  type: '',
};
