import { FC, useEffect } from 'react';
import styles from './profile-orders.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { useDispatch } from '../../services/hooks';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { WS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { OrderInfo } from '../../components/order-info/order-info';
import { OrdersList } from '../../components/orders-list/orders-list';

export const ProfileOrders: FC = () => {
  const accessToken = getCookie('accessToken');
  console.log(accessToken)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartAction(`${WS_URL}?token=${accessToken}`));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [WS_URL, dispatch, accessToken]);
  return (
    <main>
      <div className={styles.wrapper}>
        <ProfileMenu />
        <OrdersList />
      </div>
    </main>
  );
};
