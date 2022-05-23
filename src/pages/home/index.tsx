import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import styles from "./Home.module.scss";
import { BiSearch } from "react-icons/bi";

const Home: React.FC = WithAuth(() => {
  return (
    <>
      <FixedHead title="Home" />
      <header className={styles.header}>
        <div className={`${styles.searchBox}`}>
          <input
            type="text"
            placeholder="Pesquise Aqui"
            className={styles.searchInput}
          />
          <a href="#" className={styles.searchBtn}>
            <BiSearch />
          </a>
        </div>
      </header>
    </>
  );
});

export default Home;
