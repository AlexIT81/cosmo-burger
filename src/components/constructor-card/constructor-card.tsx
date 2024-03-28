import { FC, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css';
import { removeBurgerIngredient, sortBurgerIngredient } from '../../services/actions/burger';
import { IConstructorCard, IHoverItem } from '../../utils/types';
import { useDispatch } from '../../services/hooks';

export const ConstructorCard: FC<IConstructorCard> = ({ id, isDraggable, isLocked, name, price, img, type, index }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeBurgerIngredient(id as string));
  };

  // DnD
  const ref = useRef<HTMLDivElement>(null);

  const sortCard = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(sortBurgerIngredient(dragIndex, hoverIndex));
  }, [dispatch]);

  const [, drop] = useDrop({
    accept: type ? 'none' : 'sort',
    hover(item: IHoverItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      if (hoverIndex || hoverIndex === 0) {
        sortCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
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