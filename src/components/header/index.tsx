import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useUserContext } from "../../global-context";
import { useLoadingSpinner } from "../../hooks";
import { routesName } from "../../routes-name";
import styles from "../../page-components/home/Home.module.scss";
import { Dropdown } from "./components";

/**
 * Esse componente renderiza o header da página Home.
 *
 * @author Du2Du
 */
export const Header: React.FC = () => {
  const [searchBus, setSearchBus] = useState("");
  const { userData } = useUserContext();
  const { setTrue, setFalse } = useLoadingSpinner();
  const changeValue = (ev: any) => {
    setSearchBus(ev.target.value);
  };

  const {pathname}  = useRouter();

  const isLogPage = pathname === routesName.LOGS;

  return userData?(
    <header className={`${styles.header}`}>
      <Dropdown />
      <div className={`${styles.searchBox} ${isLogPage ? 'hidden' : ''}`}>
        <input
          type="text"
          value={searchBus}
          onChange={changeValue}
          placeholder="Procure pela Linha do Ônibus"
          onKeyDown={(ev) => {
            if (ev.code === "Enter") {
              setTrue();
              return Router.push(
                `${routesName.SEARCH_BUS}?line=${searchBus}`
              ).finally(setFalse);
            }
          }}
          className={styles.searchInput}
        />
        <div className={styles.searchBtn}>
          <BiSearch />
        </div>
      </div>
      <h1 style={isLogPage ? {display: 'none'} : {}}>BusTime</h1>
    </header>
  ) : null;
};
