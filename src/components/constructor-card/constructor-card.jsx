import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-card.module.css';
import { removeBurgerIngredient, sortBurgerIngredient } from '../../services/actions/burger';

export const ConstructorCard = ({ id, isDraggable, isLocked, name, price, img, type, index }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeBurgerIngredient(id));
  };

  // DnD
  const ref = useRef();

  const sortCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(sortBurgerIngredient(dragIndex, hoverIndex));
  }, []);

  const [, drop] = useDrop({
    accept: type ? 'none' : 'sort',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      sortCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [_, drag] = useDrag({
    type: 'sort',
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  return (
    <div ref={isDraggable ? ref : undefined} className={styles.card}>
      <span className={`${styles.draggable} ${isDraggable && styles.pointer}`}>
        {isDraggable && <DragIcon type="primary" />}
      </span>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={img}
        handleClose={onRemove}
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
  index: PropTypes.number,
};

ConstructorCard.defaultProps = {
  id: '',
  isDraggable: true,
  isLocked: false,
  type: '',
  index: 0,
};
