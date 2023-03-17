import { FC } from 'react';
import styles from './orders-list.module.scss';
import OrdersCard from '../orders-card/orders-card';
import { IOrder } from '../../shared/interfaces';

interface IOrdersListProps {
  orders: Array<IOrder>,
  source: string
}

const OrdersList: FC<IOrdersListProps> = ({ orders, source }) => {
  return (
    <>  
      {
        (orders.length > 0) && 
        <ul className={styles.orders_list}>
          {orders.map((order) => (
            <OrdersCard
              key={order._id}
              source={source}
              order={order}
            />
          ))}
        </ul>
      }
    </>
  );
};

export default OrdersList;
