import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { Header } from "../../page-components/home";
import { List } from "../../page-components/search-bus";
import styles from "../../page-components/search-bus/SearchBus.module.scss";

const SearchBus: React.FC = WithAuth(() => {
  return (
    <div className={styles.searchBus}>
      <FixedHead title="Pesquisar" />
      <Header />
      <List />
    </div>
  );
});

export async function getServerSideProps() {
  return {
    props: {},
  };
}
export default SearchBus;
