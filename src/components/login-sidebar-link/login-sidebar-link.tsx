import styles from './login-sidebar-link.module.scss';

function LoginSidebarLink(props: any) {
  return(
    <li className={styles.sidebar_list_item}>
      <button className={
        `${styles.sidebar_link}
        text text_type_main-default text_color_inactive
        ${props.active ? styles.sidebar_link_active : ''}`
        }
        onClick={props.onClick} 
        title={props.text}
      >
        {props.text}
      </button>
    </li>
  );
}

export default LoginSidebarLink;
