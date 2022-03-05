import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.nav}>
                    <ul className={appHeaderStyles.wrap}>
                        <li className={appHeaderStyles.item}>
                            <a href='./' className={`${appHeaderStyles.link} ${appHeaderStyles.link_active}`}>
                                <BurgerIcon type='primary' />
                                <p>Конструктор</p>
                            </a>
                        </li>
                        <li className={appHeaderStyles.item}>
                            <a href='./' className={appHeaderStyles.link}>
                                <ListIcon type='secondary' />
                                <p>Лента заказов</p>
                            </a>
                        </li>
                    </ul>
                </nav>
                <a href='./'>
                    <Logo />
                </a>
                <a href='./' className={`${appHeaderStyles.link} ${appHeaderStyles.link_auth}`}>
                    <ProfileIcon type='secondary' />
                    <p>Личный кабинет</p>
                </a>
            </div>
        </header>
    );
}
