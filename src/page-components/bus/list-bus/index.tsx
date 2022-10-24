import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { useUserContext } from "../../../global-context";
import { BusProps } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import styles from "../Bus.module.scss";

export const ListAllBus: React.FC = () => {
  const [bus, setBus] = useState<Array<BusProps>>([]);
  const { userData } = useUserContext();

  useEffect(() => {
    Backend.get(`${ApiRoutes.LIST_BUS_USER}/${userData?.id}`)
      .then((res) => setBus(res.data))
      .catch(showError);
  }, []);

  //Método que redireciona o user para a tela de alterar onibus
  const redirectBus = (busId: number) => () => {
    Router.push(`${routesName.UPDATE_BUS}/${busId}`);
  };

  return (
    <main className={styles.mainBus}>
      <h2 className={styles.title}>Rotas Criadas por Você</h2>
      {bus.length === 0 ? (
        <h2 className={styles.notBus}>Nenhuma Rota Criada</h2>
      ) : (
        bus.map((element) => (
          <div className={styles.busItem} key={element.id}>
            <div className={styles.fields}>
              <div className={styles.fieldItem}>
                <b>Linha: </b>
                {element.lineBus.lineName}
              </div>
              <div className={styles.fieldItem}>
                <b>Hora: </b>
                {element.hour}
              </div>
              <div className={styles.fieldItem}>
                <b>Passagem: </b>R${element.ticketPrice}
              </div>
              <div className={styles.fieldItem}>
                <b>Rota Incial: </b>
                {element.inicialRoute}
              </div>
              <div className={styles.fieldItem}>
                <b>Rota Final: </b>
                {element.finalRoute}
              </div>
              <div className={styles.fieldItem}>
                <b>Número: </b>
                {element.busNumber}
              </div>
            </div>
            <hr className={styles.hr} />
            <button
              type="button"
              onClick={redirectBus(element.id)}
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
