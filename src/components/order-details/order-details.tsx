import styles from './order-details.module.scss';
import logo from '../../images/doneIcon.svg';
import { useSelector } from "react-redux";
import Loader from '../loader/loader';
import { IState } from '../../shared/interfaces';

function OrderDetails() {
    const {
        orderData,
        orderRequest,
        orderSuccess,
        orderFailed
      } = useSelector(
        (state: IState) => state.order
      );

    return(
        <div className={styles.order_details_container + ' mt-20 mb-15'}>
            {
                orderRequest && 
                !orderFailed && 
                !orderSuccess && (
                <div className={styles.loader_container}>
                    <Loader />
                </div>
            )}
            {
                orderFailed && 
                !orderRequest && 
                !orderSuccess && (
                <>
                    <p className='text text_type_main-large'>
                        Произошла ошибка
                    </p>
                    <p className='text text_type_main-default text_color_inactive mt-8 mb-15'>
                        Пожалуйста, попробуйте оформить заказ позже
                    </p>
                </>
            )}
            {
                orderSuccess && 
                !orderFailed && 
                !orderRequest && (
                <>
                    <p className={styles.order_id + ' text text_type_digits-large'}>
                        {orderData?.id}
                    </p>
                    <p className='text text_type_main-medium mt-8 mb-15'>
                        идентификатор заказа
                    </p>
                    <img
                        src={logo}
                        alt="Заказ принят"
                        title="Заказ принят"
                        height="120"
                    />
                    <p className='text text_type_main-default mt-15 mb-2'>
                        Ваш заказ начали готовить
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
}

export default OrderDetails;