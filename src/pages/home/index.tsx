import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { WithAuth } from "../../global-hoc";
import { BusProps, PaginationInterface } from "../../interfaces";
import { Header, Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";
import { Backend } from "../../services/backend";
import { appUrl } from "../../utils";

/**
 * Esse componente é responsável por carregar a página Home.
 *
 * @author Du2Du
 */
const Home: React.FC = WithAuth(
  () => {
    const { userData } = useUserContext();
    const [busPagination, setBusPagination] =
      useState<PaginationInterface<BusProps>>();

    useEffect(() => {
      if (!userData) Router.reload();
      Backend.get(`${ApiRoutes.LIST_BUS}?size=4&page=0`).then(
        (res) => setBusPagination(res.data)
      );
    }, [userData]);

    return (
      <div className={styles.home}>
        <FixedHead title="Home" />
        <Header />
        <Main
          busPagination={busPagination}
          setBusPagination={setBusPagination}
        />
      </div>
    );
  }
);

export default Home;
