import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
} from '../../services/selectors';
import { clearOrder, getOrder } from '../../services/actions/order';
import { clearBurgerIngredient } from '../../services/actions/burger';
import { ForgotPassword, Login, Main, Profile, Register, ResetPassword } from '../../pages';

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
    if (isOpenModalOrder) {
      dispatch(clearBurgerIngredient());
      dispatch(clearOrder());
      setIsOpenModalOrder(false);
    } else {
      dispatch(removeIngredient());
      setIsOpenModalIngredient(false);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className={`${styles.App} mb-10`}>
          <AppHeader />
          {apiError ? (
            <p style={{ textAlign: 'center' }}>
              Ошибка получение данных с сервера. Пожалуйста, повторите запрос позже.
            </p>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Main handleModalIngredient={handleModalIngredient} handleModalOrder={handleModalOrder} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
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
