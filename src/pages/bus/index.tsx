import React from "react";
import { FixedHead } from "../../components";
import { ListAllBus } from "../../page-components/bus";
import { Header } from "../../page-components/home";
import styles from "../../page-components/bus/Bus.module.scss";
import { WithAuth } from "../../global-hoc";

const ListBus: React.FC = WithAuth(() => {
  return (
    <div className={styles.listBus}>
      <FixedHead title="Ônibus" />
      <Header />
      <ListAllBus />
    </div>
  );
}, true);

export default ListBus;
