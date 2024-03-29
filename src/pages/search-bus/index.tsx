import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { List } from "../../page-components/search-bus";
import styles from "../../page-components/search-bus/SearchBus.module.scss";

const SearchBus: React.FC = WithAuth(() => {
  return (
    <div className={styles.searchBus}>
      <FixedHead title="Pesquisar" />
      <List />
    </div>
  );
});

export default SearchBus;
