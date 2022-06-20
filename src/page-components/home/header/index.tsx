import Router from "next/router";
import React, { ChangeEventHandler, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { routesName } from "../../../routes-name";
import styles from "../Home.module.scss";
import { Dropdown } from "./components";

/**
 * Esse componente renderiza o header da página Home.
 *
 * @author Du2Du
 */
export const Header: React.FC = () => {
  const [searchBus, setSearchBus] = useState("");

  const changeValue = (ev: any) => {
    setSearchBus(ev.target.value);
  };

  return (
    <header className={`${styles.header}`}>
      <Dropdown />
      <div className={`${styles.searchBox}`}>
        <input
          type="text"
          value={searchBus}
          onChange={changeValue}
          placeholder="Procure pela Linha do Ônibus"
          onKeyDown={(ev) => {
            if (ev.code == "Enter")
              return Router.push(`${routesName.SEARCH_BUS}?line=${searchBus}`);
          }}
          className={styles.searchInput}
        />
        <a
          href={`${routesName.SEARCH_BUS}?line=${searchBus}`}
          className={styles.searchBtn}
        >
          <BiSearch />
        </a>
      </div>
      <h1>BusTime</h1>
    </header>
  );
};
