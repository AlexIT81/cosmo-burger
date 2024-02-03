import React, { useContext, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getData, createOrder } from '../../utils/api';
import { IngredientsDataContext } from '../../services/ingredientsContext';
import { removeIngredient } from '../../services/actions/ingredient';

function App() {
  const dispatch = useDispatch();
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);
  const [isModalOrderLoading, setIsModalOrderLoading] = useState(false);

  const [orderNumber, setOrderNumber] = useState(0);

  const [errorMsg, setErrorMsg] = useState('');
  // For Context
  const [ingredientsData, setIngredientsData] = useState({
    bun: null,
    ingredients: [],
  });

  function getIngredients() {
    getData()
      .then((res) => {
        setIngredientsData({
          bun: res.data.find((item) => item.type === 'bun'),
          ingredients: res.data.filter((item) => item.type !== 'bun'),
        });
        if (errorMsg) setErrorMsg('');
      })
      .catch(() => {
        setErrorMsg(
          'Произошла ошибка при запросе данных. Пожалуйста, зайдите позже.',
        );
      });
  }

  useLayoutEffect(() => {
    getIngredients();
  }, []);

  const setOrderData = () => {
    setIsModalOrderLoading(true);
    const orderData = [];
    ingredientsData.ingredients.forEach((item) => {
      orderData.push(item._id);
    });
    orderData.push(ingredientsData.bun._id);
    orderData.unshift(ingredientsData.bun._id);
    createOrder(orderData)
      .then((res) => {
        setOrderNumber(+res.order.number);
        setIsModalOrderLoading(false);
        if (errorMsg) setErrorMsg('');
      })
      .catch(() => {
        setIsModalOrderLoading(false);
        setErrorMsg(
          'Произошла ошибка при запросе данных формирования заказа. Пожалуйста, повторите запрос позже',
        );
      });
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
    setOrderNumber(0);
  };

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        {errorMsg ? (
          <p style={{ textAlign: 'center' }}>{errorMsg}</p>
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
          <OrderDetails
            orderNumber={+orderNumber}
            isModalOrderLoading={isModalOrderLoading}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
