import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { Header, Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <FixedHead title="Home" />
      <Header />
      <Main />
      <footer className="footer"></footer>
    </div>
  );
};

export default Home;
