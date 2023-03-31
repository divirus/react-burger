import { useSelector } from "react-redux";
import styles from './order-detailed-view.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../utils/format-date-time'
import { FC, useCallback, useEffect, useState } from 'react';
import { IDetailsCardProps, IIngredientsData, IOrderDetailedView, IState } from "../../shared/interfaces";

const OrderDetailedView: FC<IOrderDetailedView> = ({ order, isOrderModal = false }) => {

  const { items } = useSelector((state: IState) => state.items);
  const [orderStatusName, setOrderStatusName] = useState('');
  const [orderStatusClass, setOrderStatusClass] = useState(null);
  
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
      case 'canceled':
        setOrderStatusName('Отменён')
        setOrderStatusClass(styles.status_canceled);
        break;
      default:
        break;
    }
  }, [order.status]);

  const getOrderDateTime = useCallback((): string => (
    !!order.createdAt ? formatDateTime(order.createdAt) : ''
  ), [order.createdAt]);

  const orderedIngredients: Array<IIngredientsData> = !!order.ingredients ? (
    order.ingredients.map((item_id) => (
      items.find(item => item?._id === item_id)
    ) || {})
  ) : []

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orderedBun: IIngredientsData = orderedIngredients.find(item => item.type === 'bun') || {};
  const orderedMiddleItems: Array<IIngredientsData> = orderedIngredients.filter((item) => item.type !== 'bun');
    
  const renderIngredientIcons = useCallback(() => {
    let itemsToRender: Array<IIngredientsData> = orderedMiddleItems;

    itemsToRender.splice(0, 0, orderedBun);

    type TCountedItem = IIngredientsData & { count?: number };
 
    type TUniqueCountedItems = {
      [_id: string]: TCountedItem
    }

    const uniqueCountedItems = itemsToRender
      .map((item: IIngredientsData) => {
        return {count: 1, ...item}
      })
      .reduce<TUniqueCountedItems>((a: any, b: TCountedItem) => {
        if (!!b._id) {
          a[b._id] = 
            {
              ...b,
              count: ( a[b._id] ? a[b._id].count : 0) + (b.type === 'bun' ? 2 : 1),
            }
          return a
        }
        return 0
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
    const orderIngredients = order?.ingredients?.map((item_id) => {
      let orderedItems = items.find((item: IDetailsCardProps) => item._id === item_id)

      return ({
        price: orderedItems?.price || 0,
        type: orderedItems?.type || null
      })
    });

    const bunPrice: number = orderIngredients?.find((item) => item.type === 'bun')?.price || 0;
    const ingredients = orderIngredients?.reduce((acc, p) => (
      acc + (p.type !== 'bun' ? p.price : 0)), 0) || 0

    return(bunPrice * 2 + ingredients);
  }, [items, order.ingredients]);

  return(
    <div className={styles.order_container}>
      {!isOrderModal &&
        <p className={
            styles.order_id +
          ' text text_type_digits-default'
        }>
        {`#${order?.number?.toString().padStart(6, '0')}`}
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