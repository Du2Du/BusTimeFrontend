import Router from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { ApiRoutes } from "../../../api-routes";
import { useLoadingSpinner } from "../../../hooks";
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
  const { setTrue, setFalse } = useLoadingSpinner();

  //Esse useEffect faz a chamada na API e pega o response e seta como valor do array de ônibus.
  useEffect(() => {
    loadBus();
  }, []);

  //Método que carrega os onibus
  const loadBus = () => {
    Backend.get(`${ApiRoutes.LIST_BUS_USER}`)
      .then((res) => setBuses(res.data))
      .catch(showError);
  };

  //Método que redireciona o user para a tela de alterar o ônibus
  const redirectBus = (busId: number) => () => {
    Router.push(`${routesName.UPDATE_BUS}/${busId}`);
  };

  //Método que exclui um onibus
  const excludeBus = (id: number) => () => {
    setTrue();
    Backend.delete(`${ApiRoutes.DELETE_BUS}/${id}`)
      .then((res) => {
        toast.success("Ônibus excluido com sucesso!");
        loadBus();
      })
      .catch(showError)
      .finally(setFalse);
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
            <div className="flex justify-between items-center w-[100%]">
              <button
                type="button"
                onClick={redirectBus(bus.id)}
                className={`${styles.update} mb-4 ml-2  mt-3`}
              >
                Alterar
              </button>
              <FaTrash
                size={20}
                className="cursor-pointer"
                color="#7E4CCB"
                onClick={excludeBus(bus.id)}
              />
            </div>
          </div>
        ))
      )}
    </main>
  );
};
