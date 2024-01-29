import React, { useContext, useLayoutEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getData, createOrder } from '../../utils/api';
import { IngredientsDataContext } from '../../services/ingredientsContext';

function App() {
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const [orderNumber, setOrderNumber] = useState(0);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const [ingredients, setIngredients] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');
  // For Context
  const [ingredientsData, setIngredientsData] = useState({ bun: null, ingredients: [] });

  function getIngredients() {
    return getData()
      .then((res) => {
        setIngredients(res.data);
        setIngredientsData({
          bun: res.data.find((item) => item.type === 'bun'),
          ingredients: res.data.filter((item) => item.type !== 'bun')
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
    const orderData = []
    ingredientsData.ingredients.forEach((item) => {
      orderData.push(item._id);
    })
    orderData.push(ingredientsData.bun._id);
    orderData.unshift(ingredientsData.bun._id);
    createOrder(orderData)
      .then((res) => {
        setOrderNumber(+res.order.number)
        if (errorMsg) setErrorMsg('');
      })
      .catch(() => {
        setErrorMsg(
          'Произошла ошибка при запросе данных формирования заказа. Пожалуйста, повторите запрос позже',
        );
      });
  }

  const handleModalOrder = () => {
    setOrderData();
    setIsOpenModalOrder(true);
  };

  const handleModalIngredient = (id) => {
    setCurrentIngredient(ingredients.find((item) => item._id === id));
    setIsOpenModalIngredient(true);
  };

  const closeModal = () => {
    setIsOpenModalIngredient(false);
    setIsOpenModalOrder(false);
    setCurrentIngredient({});
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
            <BurgerIngredients
              ingredients={ingredients}
              handleModalIngredient={handleModalIngredient}
            />
            {/* eslint-disable-next-line */}
            <IngredientsDataContext.Provider value={{ ingredientsData, setIngredientsData }}>
              <BurgerConstructor
                handleModalOrder={handleModalOrder}
              />
            </IngredientsDataContext.Provider>
          </main>
        )}
      </div>
      {isOpenModalIngredient && (
        <Modal closeModal={closeModal} title="Детали ингредиента">
          <IngredientDetails
            image={currentIngredient.image}
            name={currentIngredient.name}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            fat={currentIngredient.fat}
            carbohydrates={currentIngredient.carbohydrates}
          />
        </Modal>
      )}
      {isOpenModalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={+orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
