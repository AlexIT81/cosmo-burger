import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';
import { getBurgerBunSelector, getBurgerIngredientsSelector } from '../../utils/constants';

export const BurgerConstructor = ({ handleModalOrder }) => {
  const burgerIng = useSelector(getBurgerIngredientsSelector);
  const burgerBun = useSelector(getBurgerBunSelector);

  const totalSum = useMemo(() => {
    if (burgerIng && burgerBun) {
      return burgerIng.reduce((result, item) => {
        return result += item.price;
      }, burgerBun.price * 2);
    }
    return 0
  }, [burgerIng, burgerBun]);

  return (
    <section className="pt-25">
      {burgerBun ? (
        <>
          <div className="mr-4 ml-4 mb-4">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${burgerBun.name} (верх)`}
              price={burgerBun.price}
              img={burgerBun.image_mobile}
              type="top"
              extraClass="ml-4"
            />
          </div>
          <ul className={`${styles.list} pr-4 pl-4 mb-4`}>
            {burgerIng.length ? (burgerIng.map((item) => {
              return (
                  <li key={item.id}>
                    <ConstructorCard
                      isDraggable
                      id={item.id}
                      isLocked={false}
                      name={item.name}
                      price={item.price}
                      img={item.image_mobile}
                    />
                  </li>
              );
            })) : (<p className='text text_type_main-medium ml-4'>Добавьте ингредиенты</p>)}
          </ul>
          <div className="mr-4 ml-4 mb-10">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${burgerBun.name} (низ)`}
              price={burgerBun.price}
              img={burgerBun.image_mobile}
              type="bottom"
            />
          </div>
          {burgerIng.length > 0 && burgerBun && <ConstructorTotal
            totalSum={totalSum}
            handleModalOrder={handleModalOrder}
          />}
        </>
      ) : (<p className='text text_type_main-medium ml-4'>Выберите булку!</p>)}
    </section>
  );
};

BurgerConstructor.propTypes = {
  // ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleModalOrder: PropTypes.func.isRequired,
};
