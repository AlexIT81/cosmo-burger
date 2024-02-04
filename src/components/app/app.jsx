import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { removeIngredient } from '../../services/actions/ingredient';
import {
  getBurgerBunSelector,
  getBurgerIngredientsErrorSelector,
  getBurgerIngredientsSelector,
} from '../../utils/constants';
import { clearOrder, getOrder } from '../../services/actions/order';

function App() {
  const dispatch = useDispatch();
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const orderBun = useSelector(getBurgerBunSelector);
  const orderIngredients = useSelector(getBurgerIngredientsSelector);

  const apiError = useSelector(getBurgerIngredientsErrorSelector);

  const setOrderData = () => {
    const orderData = [];
    orderIngredients.forEach((item) => {
      orderData.push(item._id);
    });
    orderData.push(orderBun._id);
    orderData.unshift(orderBun._id);
    dispatch(getOrder(orderData));
  };

  const handleModalOrder = () => {
    setOrderData();
    setIsOpenModalOrder(true);
  };

  const handleModalIngredient = () => {
    setIsOpenModalIngredient(true);
  };

  const closeModal = () => {
    setIsOpenModalIngredient(false);
    setIsOpenModalOrder(false);
    dispatch(removeIngredient());
    dispatch(clearOrder());
  };

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        {apiError ? (
          <p style={{ textAlign: 'center' }}>Ошибка получение данных с сервера. Пожалуйста, повторите запрос позже...</p>
        ) : (
          <main className={styles.main}>
            <BurgerIngredients handleModalIngredient={handleModalIngredient} />
            <BurgerConstructor handleModalOrder={handleModalOrder} />
          </main>
        )}
      </div>
      {isOpenModalIngredient && (
        <Modal closeModal={closeModal} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
      {isOpenModalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
