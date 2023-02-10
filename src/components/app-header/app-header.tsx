import styles from "./app-header.module.scss"
import HeaderItem from "./header-item/header-item";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AppHeader() {
    const navigate = useNavigate();

    const [isHomePage, setHomePage] = useState(false);
    const [isProfilePage, setProfilePage] = useState(false);

    const location = useLocation();
    const currentUrl = location.pathname;

    useEffect(() => {
        switch (currentUrl.split('/')[1]) {
            case '':
                setHomePage(true);
                break;
            case 'profile':
                setProfilePage(true);
                break;
            default:
                break;
        }
    }, [currentUrl, setHomePage, setProfilePage]);

    const onConstructorClick = () => {
        navigate('/', { replace: true })
    };
    const onProfileClick = () => {
        navigate('/profile', { replace: true })
    };
    
    return(
        <header>
            <nav className={styles.container}>
                <ul className={styles.buttons_list}>
                    <ul className={styles.buttons_list_left}>
                            <HeaderItem
                                icon={
                                    <BurgerIcon type={isHomePage ? "primary" : "secondary"} />
                                }
                                text="Конструктор"
                                onClick={onConstructorClick}
                                active={isHomePage}
                            />
                        <HeaderItem icon={<ListIcon type="secondary" />} text="Лента заказов" onClick={()=>{}} />
                    </ul>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <span className={styles.buttons_list_right}>
                        <HeaderItem
                            icon={
                                <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
                            }
                            text="Личный кабинет"
                            onClick={onProfileClick}
                            active={isProfilePage}
                        />
                    </span>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
