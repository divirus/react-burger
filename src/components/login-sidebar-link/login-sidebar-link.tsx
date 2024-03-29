import styles from './login-sidebar-link.module.scss';

interface ISidebarLinkProps {
  active?: boolean,
  text: string,
  onClick: () => void,
}

function SidebarLink(props: ISidebarLinkProps) {
  return(
    <li className={styles.sidebar_list_item}>
      <button className={
        `${styles.sidebar_link} text text_type_main-default text_color_inactive
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

export default SidebarLink;