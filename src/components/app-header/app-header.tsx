import styles from "./app-header.module.scss"
import HeaderItem from "./header-item/header-item";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return(
      <header>
          <nav className={styles.container}>
              <ul className={styles.buttons_list}>
                  <ul className={styles.buttons_list_left}>
                      <HeaderItem icon={<BurgerIcon type="primary" />} text="Конструктор" link="#" active/>
                      <HeaderItem icon={<ListIcon type="secondary" />} text="Лента заказов" link="#" />
                  </ul>
                  <li className={styles.logo}>
                      <Logo />
                  </li>
                  <span className={styles.buttons_list_right}>
                      <HeaderItem icon={<ProfileIcon type="secondary" />} text="Личный кабинет" link="#" />
                  </span>
              </ul>
          </nav>
      </header>
  );
}

export default AppHeader;
