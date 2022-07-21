import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { Header, Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";

/**
 * Esse componente é responsável por carregar a página Home.
 *
 * @author Du2Du
 */
const Home: React.FC = WithAuth(() => {
  return (
    <div className={styles.home}>
      <FixedHead title="Home" />
      <Header />
      <Main />
    </div>
  );
});

export default Home;
