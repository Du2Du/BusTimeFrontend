import React from "react";
import { BiSearch } from "react-icons/bi";
import styles from "../Home.module.scss";
import { Dropdown } from "./components";

/**
 * Esse componente renderiza o header da página Home.
 *
 * @author Du2Du
 */
export const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <Dropdown />
      <div className={`${styles.searchBox}`}>
        <input
          type="text"
          placeholder="Procure pela Linha do Ônibus"
          className={styles.searchInput}
        />
        <a href="#" className={styles.searchBtn}>
          <BiSearch />
        </a>
      </div>
      <h1>BusTime</h1>
    </header>
  );
};
