import React from 'react';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-card.module.css';

export const ConstructorCard = ({
  isDraggable,
  isLocked,
  name,
  price,
  img,
  type
}) => {
  return (
    <div className={styles.card}>
      <span className={styles.draggable}>{isDraggable && <DragIcon type='primary' />}</span>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={img}
      />
    </div>
  );
};

ConstructorCard.propTypes = {
  isDraggable: PropTypes.bool,
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string
};

ConstructorCard.defaultProps = {
  isDraggable: true,
  isLocked: false,
  type: ''
};
