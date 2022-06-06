import { AxiosResponse } from "axios";
import { GetStaticPropsContext } from "next";
import React, { useEffect } from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { BusProps, PaginationInterface } from "../../interfaces";
import { Header, Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";
import { Backend } from "../../services/backend";

/**
 * Esse componente é responsável por carregar a página Home.
 *
 * @author Du2Du
 */
const Home: React.FC = WithAuth(() => {
  const { setTrue } = useLoadingSpinner();
  useEffect(() => {
    setTrue();
  }, []);
  return (
    <div className={styles.home}>
      <FixedHead title="Home" />
      <Header />
      <Main />
    </div>
  );
});

export default Home;
