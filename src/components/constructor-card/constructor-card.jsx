import { useDispatch} from 'react-redux';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-card.module.css';
import { removeBurgerIngredient } from '../../services/actions/burger';

export const ConstructorCard = ({
  id,
  isDraggable,
  isLocked,
  name,
  price,
  img,
  type,
}) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeBurgerIngredient(id));
  };
  return (
    <div className={styles.card}>
      <span className={styles.draggable}>
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
};

ConstructorCard.defaultProps = {
  id: '',
  isDraggable: true,
  isLocked: false,
  type: '',
};
