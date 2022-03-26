import { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header.module.css";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.wrap}>
            <li className={styles.item}>
              <a href="./" className={`${styles.link} ${styles.link_active}`}>
                <BurgerIcon type="primary" />
                <p>Конструктор</p>
              </a>
            </li>
            <li className={styles.item}>
              <a href="./" className={styles.link}>
                <ListIcon type="secondary" />
                <p>Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <a href="./">
          <Logo />
        </a>
        <a href="./" className={`${styles.link} ${styles.link_auth}`}>
          <ProfileIcon type="secondary" />
          <p>Личный кабинет</p>
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
