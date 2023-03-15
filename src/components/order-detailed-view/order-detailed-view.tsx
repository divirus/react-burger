import { useSelector } from "react-redux";
import styles from './order-detailed-view.module.scss';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../utils/format-date-time'
import { useCallback, useEffect, useState } from 'react';
import { IIngridientsData } from "../../shared/interfaces";

const OrderDetailedView = ({ order, isOrderModal = false }: any) => {

  const { items } = useSelector((state: any) => state.items);
  const [orderStatusName, setOrderStatusName] = useState('');
  const [orderStatusClass, setOrderStatusClass] = useState(null);
  
  // defining the order status text and class based on status string from server
  useEffect(() => {
    switch (order.status) {
      case 'created':
        setOrderStatusName('Создан');
        break;

      case 'pending':
        setOrderStatusName('Готовится');
        break;

      case 'done':
        setOrderStatusName('Выполнен')
        setOrderStatusClass(styles.status_completed);
        break;

      // TODO: find out what status string server will send on error
      case 'canceled':
        setOrderStatusName('Отменён')
        setOrderStatusClass(styles.status_canceled);
        break;

      default:
        break;
    }
  }, [order.status]);

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    formatDateTime(order.createdAt)
  ), [order.createdAt]);

  const orderedIngredients = order.ingredients.map((item_id: string) => (
    items.find((item: IIngridientsData) => item._id === item_id)
  ));

  const orderedBun = orderedIngredients.find((item: IIngridientsData) => item.type === 'bun');
  const orderedMiddleItems = orderedIngredients.filter((item: IIngridientsData) => item.type !== 'bun');
    
  const renderIngredientIcons = useCallback(() => {
    let itemsToRender = orderedMiddleItems;
    // adding bun in the first place
    itemsToRender.splice(0, 0, orderedBun);

    const uniqueCountedItems = itemsToRender
      .map((item: IIngridientsData) => {
        return {count: 1, ...item}
      })
      .reduce((a: any, b: IIngridientsData) => {
        a[b._id] = 
          {
            ...b,
            // counting buns twice
            count: ( a[b._id] ? a[b._id].count : 0) + (b.type === 'bun' ? 2 : 1),
          }
        return a
      }, {})
 
    let renderedItems = [];
    for (let item_id in uniqueCountedItems) {
      renderedItems.push(
        <li
          className={styles.ingredient_wrapper}
          key={uniqueCountedItems[item_id]._id}>
          <span 
            className='ingredient_icon_wrapper'
          >
            <img 
              src={uniqueCountedItems[item_id].image_mobile}
              alt={uniqueCountedItems[item_id].name}
              title={uniqueCountedItems[item_id].name}
              width='112px'
              className='ingredient_icon'
            />
          </span>
          <p className={
            styles.ingredient_name +
            ' text text_type_main-default'
          }>
            {uniqueCountedItems[item_id].name}
          </p>
          <span className={styles.ingredient_price}>
            <p className='text text_type_digits-default'>
              {`${uniqueCountedItems[item_id].count} x ${uniqueCountedItems[item_id].price}`}
            </p>
            <CurrencyIcon type='primary' />
          </span>
        </li>
      )
    };
    return renderedItems;
  }, [orderedMiddleItems, orderedBun]);

  const calculateOrderPrice = useCallback(() => {
    const orderIngredients = order.ingredients.map((item_id: string) => {
      let orderedItems = items.find((item: IIngridientsData) => item._id === item_id)
      return ({
        price: orderedItems.price,
        type: orderedItems.type
      })
    });
    // select only 1st bun in a case when there are 2 buns in the order (there shouldn't be)
    const bunPrice = orderIngredients.find((item: IIngridientsData) => item.type === 'bun').price;
    return(bunPrice * 2 + orderIngredients.reduce((acc: number, p: IIngridientsData) => (
      acc + (p.type !== 'bun' ? p.price : 0)), 0)
    );
  }, [items, order.ingredients]);

  return(
    <div className={styles.order_container}>
      {!isOrderModal &&
        <p className={
            styles.order_id +
          ' text text_type_digits-default'
        }>
        {/* display order number in 6-digit format filled with zeros */}
        {`#${order.number.toString().padStart(6, 0)}`}
      </p>
      }
      <p className={'mt-10 mb-3 text text_type_main-medium'}>
        {order.name}
      </p>
      <p className={
        `${orderStatusClass} mt-2 text text_type_main-default`
      }>
        {orderStatusName}
      </p>
      <p className={'mt-15 mb-6 text text_type_main-medium'}>
        Состав:
      </p>
      <ul className={styles.ingredients_container + ' pr-6'}>
        {renderIngredientIcons()}
      </ul>
      <div className={styles.order_info + ' mt-10'}>
        <p className='text text_type_main-default text_color_inactive'>
          {getOrderDateTime()}
        </p>  
        <div className={'flex_row ml-6'}>
          <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailedView;