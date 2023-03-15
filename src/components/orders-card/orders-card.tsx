import { useSelector } from "react-redux";
import styles from './orders-card.module.scss';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../utils/format-date-time'

import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState, memo } from 'react';
import { IIngridientsData, IOrder } from "../../shared/interfaces";

interface IOrdersCardProps {
  order: IOrder,
  source: string
}

const OrdersCard: any = ({ order, source }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items
  } = useSelector(
    (state: any) => state.items
  );

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

  const handleOrderClick = () => {
    const currentUrl = location.pathname;
    navigate(`${currentUrl}/${order._id}`, { 
        replace: true,
        state: { background: location }
    })
  }

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    formatDateTime(order.createdAt)
  ), [order.createdAt]);

  const orderedIngredients = order.ingredients.map((item_id: string) => (
    items.find((item: IIngridientsData) => item._id === item_id)
  ));

  // skip if there empty or other falsy result instead of ingredient id
  const filteredOrderedIngredients = orderedIngredients.filter((item: IIngridientsData) => item);

  const orderedBun = filteredOrderedIngredients.find((item: IIngridientsData) => item.type === 'bun');
  const orderedMiddleItems = filteredOrderedIngredients.filter((item: IIngridientsData) => item.type !== 'bun');

  const renderIngredientIcons = useCallback(() => {
    let itemsToRender = orderedMiddleItems;
    // adding bun in the first place
    itemsToRender.splice(0, 0, orderedBun);

    return itemsToRender.map((ingredient: IIngridientsData, index: number) => {
      const ingredientsToShow = 5;
      if (index > ingredientsToShow) return null;

      return (
        // skip if there is no bun or other invalid ingredient
        (ingredient && ingredient._id) &&
        <li key={ingredient._id+index}>
          <span 
            className={styles.ingredient_icon_wrapper}
            style={{ zIndex: 10 - index }}
          >
            <img 
              src={ingredient.image_mobile}
              alt={ingredient.name}
              title={ingredient.name}
              width='112px'
              className='ingredient_icon'
            />
          </span>
          {index === ingredientsToShow ? (
            <span
              className={styles.more_ingredients_icon}
            >
              <p className={
                styles.more_icon_text +
                ' text text_type_main-default'
              }>
                +{itemsToRender.length - ingredientsToShow}
              </p>
              <span className={styles.more_icon_wrapper}></span>
            </span>
          ) : null}
        </li>
      );
    })
  }, [orderedMiddleItems, orderedBun]);

  const calculateOrderPrice = useCallback(() => (
    // skip if there is no bun
    orderedBun && orderedBun.price ? 
      (
        // select only 1st bun in a case when there are 2 buns in the order (there shouldn't be)
        orderedBun.price + orderedMiddleItems.reduce((acc: number, p: IIngridientsData) => (acc + p.price), 0)
      ) : ( 0 )
  ), [orderedBun, orderedMiddleItems]);

  return(
    // skip if there is no bun
    (!!orderedBun && !!orderedBun._id) &&
    <li
      className={styles.order_card} 
      onClick={handleOrderClick}
    >
      <div className={styles.order_info}>
        <p className='text text_type_digits-default'>
          {/* display order number in 6-digit format filled with zeros */}
          {`#${order.number.toString().padStart(6, 0)}`}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {getOrderDateTime()}
        </p>
      </div>
      <p className={'mt-6 text text_type_main-medium'}>
        {order.name}
      </p>
      {/* order status is displayed only on HistoryPage, not on FeedPage */}
      {source === 'history' ?
        <p className={
          `${orderStatusClass} mt-2 text text_type_main-default`
        }>
          {orderStatusName}
        </p>
        : null
      }
      <div className={styles.order_info + ' mt-6'}>
        <ul className={styles.ingredient_icons_container}>
          {renderIngredientIcons()}
        </ul>
        <div className={'flex_row ml-6'}>
          <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </li>
  );
};

// comparing updateAt field from server and from props
// to check whether the order data was changed
const compareOrders = (
  prevProps: IOrdersCardProps,
  nextProps: IOrdersCardProps
) => {
  if (prevProps.order)
    return prevProps.order.updatedAt !== nextProps.order.updatedAt;
  else
    return false
}

// memoizing component to avoid unnecessary renders
export default memo(OrdersCard, compareOrders);