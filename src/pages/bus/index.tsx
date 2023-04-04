import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { ListAllBus } from "../../page-components/bus";
import styles from "../../page-components/bus/Bus.module.scss";

/**
 * Essa página renderiza a tela de todos os ônibus cadastrados pelo usuário.
 * Componentes da Página:
 *
 * - Campos dos ônibus
 * - Botão de atualizar cada ônibus
 *
 * @author Du2Du
 */
const ListBus: React.FC = WithAuth(() => {
  return (
    <div className={styles.listBus}>
      <FixedHead title="Ônibus" />
      <ListAllBus />
    </div>
  );
}, true);

export default ListBus;
