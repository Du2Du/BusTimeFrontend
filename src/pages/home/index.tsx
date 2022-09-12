import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { WithAuth } from "../../global-hoc";
import { BusProps, PaginationInterface } from "../../interfaces";
import { Header, Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";
import { appUrl } from "../../utils";

/**
 * Esse componente é responsável por carregar a página Home.
 *
 * @author Du2Du
 */
const Home: React.FC<{ bus: PaginationInterface<BusProps> }> = WithAuth(
  ({ bus }) => {
    const { userData } = useUserContext();
    const [busPagination, setBusPagination] =
      useState<PaginationInterface<BusProps>>(bus);

    useEffect(() => {
      if (!userData) Router.reload();
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

export async function getServerSideProps() {
  const data = await fetch(`${appUrl}${ApiRoutes.LIST_BUS}?size=3&page=0`);
  const bus = await data.json();

  return {
    props: { bus },
  };
}

export default Home;
