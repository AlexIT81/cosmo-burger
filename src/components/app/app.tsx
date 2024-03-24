import { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import {
  getBurgerBunSelector,
  getBurgerIngredientsErrorSelector,
  getBurgerIngredientsSelector,
} from '../../services/selectors';
import { clearOrder, getOrder } from '../../services/actions/order';
import { clearBurgerIngredient } from '../../services/actions/burger';
import {
  Feed,
  ForgotPassword,
  Login,
  Main,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '../../pages';
import { getCookie } from '../../utils/cookie';
import { updateTokenAction } from '../../services/actions/user/update-token';
import { getUserDataAction } from '../../services/actions/user/get-user';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { IngredientView } from '../../pages/ingredients/ingredients';
import { getInrgedients } from '../../services/actions/ingredients';
import { IIngredient } from '../../utils/types';
import { FeedId } from '../../pages/feed-id/feed-id';
import { OrderInfo } from '../order-info/order-info';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const orderBun = useSelector(getBurgerBunSelector);
  const orderIngredients = useSelector(getBurgerIngredientsSelector);

  const apiError = useSelector(getBurgerIngredientsErrorSelector);

  // начальное получение всех ингредиентов
  useEffect(() => {
    dispatch(getInrgedients());
  }, [dispatch]);

  // конструктор заказа
  const setOrderData = () => {
    const orderData = [];
    orderIngredients.forEach((item: IIngredient) => {
      orderData.push(item._id);
    });
    orderData.push(orderBun!._id);
    orderData.unshift(orderBun!._id);
    dispatch(getOrder(orderData));
  };

  // модальные окна
  const handleModalOrder = () => {
    setOrderData();
    setIsOpenModalOrder(true);
  };

  const closeModal = () => {
    if (isOpenModalOrder) {
      dispatch(clearBurgerIngredient());
      dispatch(clearOrder());
      setIsOpenModalOrder(false);
    } else {
      navigate(-1);
    }
  };

  // для модалок
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  // авторизация
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    if (!accessToken && refreshToken) dispatch(updateTokenAction());
    if (accessToken && refreshToken) dispatch(getUserDataAction());
  }, [refreshToken, accessToken, dispatch]);

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        {apiError ? (
          <p style={{ textAlign: 'center' }}>Ошибка получение данных с сервера. Пожалуйста, повторите запрос позже.</p>
        ) : (
          <>
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Main handleModalOrder={handleModalOrder} />} />
              <Route path="/login" element={<ProtectedRouteElement element={<Login />} needAuth={false} />} />
              <Route path="/register" element={<ProtectedRouteElement element={<Register />} needAuth={false} />} />
              <Route
                path="/forgot-password"
                element={<ProtectedRouteElement element={<ForgotPassword />} needAuth={false} />}
              />
              <Route
                path="/reset-password"
                element={<ProtectedRouteElement element={<ResetPassword />} needAuth={false} />}
              />
              <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} needAuth />} />
              <Route
                path="/profile/orders"
                element={
                  <ProtectedRouteElement backgroundLocation={backgroundLocation} element={<ProfileOrders />} needAuth />
                }
              />
              <Route path="/feed" element={<Feed />} />
              <Route path="/feed/:id" element={<FeedId />} />
              {/* <Route path="/profile/orders/:id" element={<FeedId />} /> */}
              <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<FeedId />} needAuth />} />
              <Route path="/ingredients/:id" element={<IngredientView />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>

            {backgroundLocation && (
              <Routes>
                <Route
                  path="/ingredients/:id"
                  element={
                    <Modal closeModal={closeModal} title="Детали ингредиента">
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path="/feed/:id"
                  element={
                    <Modal closeModal={closeModal}>
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route
                  path="/profile/orders/:id"
                  element={
                    <Modal closeModal={closeModal}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </>
        )}
      </div>
      {isOpenModalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
