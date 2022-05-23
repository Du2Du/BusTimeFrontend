import React from "react";
import { BiSearch } from "react-icons/bi";
import styles from "../Home.module.scss";
import { Dropdown } from "./components";

export const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <Dropdown />
      <div className={`${styles.searchBox}`}>
        <input
          type="text"
          placeholder="Procure Ônibus"
          className={styles.searchInput}
        />
        <a href="#" className={styles.searchBtn}>
          <BiSearch />
        </a>
      </div>
    </header>
  );
};
