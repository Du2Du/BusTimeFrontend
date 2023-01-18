import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { BusProps } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import { formatToLocalCurrency } from "../../../utils/string";
import styles from "../Bus.module.scss";

/**
 * Esse main renderiza a tela de todos os ônibus cadastrados pelo usuário.
 * Componentes da Página:
 *
 * - Campos dos ônibus
 * - Botão de atualizar cada ônibus
 *
 * @author Du2Du
 */
export const ListAllBus: React.FC = () => {
  const [buses, setBuses] = useState<Array<BusProps>>([]);

  //Esse useEffect faz a chamada na API e pega o response e seta como valor do array de ônibus.
  useEffect(() => {
    Backend.get(`${ApiRoutes.LIST_BUS_USER}`)
      .then((res) => setBuses(res.data))
      .catch(showError);
  }, []);

  //Método que redireciona o user para a tela de alterar o ônibus
  const redirectBus = (busId: number) => () => {
    Router.push(`${routesName.UPDATE_BUS}/${busId}`);
  };

  return (
    <main className={styles.mainBus}>
      <h2 className={styles.title}>Rotas Criadas por Você</h2>
      {buses.length === 0 ? (
        <h2 className={styles.notBus}>Nenhuma Rota Criada</h2>
      ) : (
        buses.map((bus) => (
          <div className={styles.busItem} key={bus.id}>
            <div className={styles.fields}>
              <div className={styles.fieldItem}>
                <b>Linha: </b>
                {bus.lineBus.lineName}
              </div>
              <div className={styles.fieldItem}>
                <b>Hora: </b>
                {bus.hour}
              </div>
              <div className={styles.fieldItem}>
                <b>Passagem: </b>
                {formatToLocalCurrency(String(bus.ticketPrice))}
              </div>
              <div className={styles.fieldItem}>
                <b>Rota Incial: </b>
                {bus.inicialRoute}
              </div>
              <div className={styles.fieldItem}>
                <b>Rota Final: </b>
                {bus.finalRoute}
              </div>
              <div className={styles.fieldItem}>
                <b>Número: </b>
                {bus.busNumber}
              </div>
            </div>
            <hr className={styles.hr} />
            <button
              type="button"
              onClick={redirectBus(bus.id)}
              className={`${styles.update} mb-4 ml-2  mt-3`}
            >
              Alterar
            </button>
          </div>
        ))
      )}
    </main>
  );
};
