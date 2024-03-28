import { FC, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';
import { getBurgerBunSelector, getBurgerIngredientsSelector } from '../../services/selectors';
import { addBurgerIngredient } from '../../services/actions/burger';
import { IOnlyModal, IIngredient, IIngredientWithId } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

export const BurgerConstructor: FC<IOnlyModal> = ({ handleModalOrder }) => {
  const dispatch = useDispatch();
  const burgerIng = useSelector(getBurgerIngredientsSelector);
  const burgerBun = useSelector(getBurgerBunSelector);

  const totalSum = useMemo(() => {
    if (burgerIng && burgerBun) {
      return burgerIng.reduce((result: number, item: IIngredientWithId) => {
        return (result += item.price);
      }, burgerBun.price * 2);
    }
    return 0;
  }, [burgerIng, burgerBun]);

  // DnD ингредиенты
  const onDropHandler = (ingredient: IIngredient) => {
    dispatch(addBurgerIngredient(ingredient));
  };

  const [{ isListHover }, dropIngredientTarget] = useDrop({
    accept: 'filling',
    drop(ingredient: IIngredient): void {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isListHover: monitor.isOver(),
    }),
  });
  const listStyle = !isListHover ? `${styles.list} pr-4 pl-4 mb-4` : `${styles.list} pr-4 pl-4 mb-4 ${styles.hover}`;

  // DnD булки
  const [{ isBunHover }, dropBunTarget] = useDrop({
    accept: 'bun',
    drop(ingredient: IIngredient): void {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isBunHover: monitor.isOver(),
    }),
  });
  const bunStyle = isBunHover ? `${styles.hover} mr-4 ml-4 mb-4 ${styles.bun}` : `mr-4 ml-4 mb-4 ${styles.bun}`;

  // Сортировка по индексу
  const renderCard = useCallback((item: IIngredientWithId, index: number) => {
    return (
      <li key={item.id}>
        <ConstructorCard
          isDraggable
          id={item.id}
          isLocked={false}
          name={item.name}
          price={item.price}
          img={item.image_mobile}
          index={index}
        />
      </li>
    );
  }, []);

  return (
    <section className="pt-25">
      <div className={bunStyle} ref={dropBunTarget}>
        {burgerBun ? (
          <ConstructorCard
            isDraggable={false}
            isLocked
            name={`${burgerBun.name} (верх)`}
            price={burgerBun.price}
            img={burgerBun.image_mobile}
            type="top"
          />
        ) : (
          <p className="text text_type_main-medium ml-8">Перетащите сюда булку!</p>
        )}
      </div>
      <ul className={listStyle} ref={dropIngredientTarget}>
        {burgerIng.length ? (
          burgerIng.map((item: IIngredientWithId, i: number) => renderCard(item, i))
        ) : (
          <p className="text text_type_main-medium ml-8">Перетащите сюда соусы и начинки!</p>
        )}
      </ul>
      <div className="mr-4 ml-4 mb-10">
        {burgerBun && (
          <ConstructorCard
            isDraggable={false}
            isLocked
            name={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            img={burgerBun.image_mobile}
            type="bottom"
          />
        )}
      </div>
      {burgerIng.length > 0 && burgerBun && (
        <ConstructorTotal totalSum={totalSum} handleModalOrder={handleModalOrder} />
      )}
    </section>
  );
};
