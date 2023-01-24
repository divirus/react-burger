import doneIcon from "../../images/doneIcon.svg";
import styles from './order-details.module.scss';

function OrderDetails( props: { orderData: { id: number | undefined, name: string | undefined, success: boolean }}) {
    return(
        <div className={styles.container + ' mt-20 mb-15'}>
            {
                props.orderData.success &&
                <>
                    <p className={styles.order_id + ' text text_type_digits-large'}>
                        {props.orderData.id}
                    </p>
                    <p className='text text_type_main-medium mt-8 mb-15'>
                        идентификатор заказа
                    </p>
                    <img 
                        src={doneIcon} 
                        alt="Done" 
                        className={'mb-15'}
                    />
                    <p className='text text_type_main-default mt-15 mb-2'>
                        Ваш заказ начали готовить
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            }
        </div>
    );
}

export default OrderDetails;