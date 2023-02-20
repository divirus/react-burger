import { ReactNode } from 'react';
import styles from './header-item.module.scss';

function HeaderItem(props: {active?: boolean, text: string, icon: ReactNode, onClick: () => void}) {
    return(
        <li>
            <button className={`${styles.header_item} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${props.active ? styles.header_item_active : ''}`}
                onClick={props.onClick} 
                title={props.text}
            >
                <div className={styles.header_item_icon + ' mr-2'}>
                    {props.icon}
                </div>
                <span className={styles.header_item_text + ' text text_type_main-default text_color_inactive'}>
                    {props.text}
                </span>
            </button>
        </li>
    );
}

export default HeaderItem;