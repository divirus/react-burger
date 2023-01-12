import PropTypes from 'prop-types';
import styles from './header-item.module.scss';

function HeaderItem(props: any) {
    return(
        <li>
            <a className={styles.header_item + ' pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 mr-2 ' +
               (props.active ? styles.active : null)}
                href={props.link} 
                title={props.text}
            >
                <div className={styles.header_item_icon + ' mr-2'}>
                    {props.icon}
                </div>
                <span className={styles.header_item_text + ' text text_type_main-default text_color_inactive'}>
                    {props.text}
                </span>
            </a>
        </li>
    );
}

HeaderItem.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

export default HeaderItem;