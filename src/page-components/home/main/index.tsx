import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { Button, Pagination } from "../../../components";
import { useUserContext } from "../../../global-context";
import { BusProps, PaginationInterface } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import styles from "../Home.module.scss";
import { BusItem } from "./components";

/**
 * Esse componente renderiza o main da página Home.
 *
 * @author Du2Du
 */
export const Main: React.FC = () => {
  const [busPagination, setBusPagination] =
    useState<PaginationInterface<BusProps>>();
  const { isAdmin } = useUserContext();

  /**
   * Método que redireciona o usuário para a tela de registrar ônibus ao clicar no botão
   * "Cadastrar"
   */
  const redirectCreateBus = () => {
    Router.push(routesName.CREATE_BUS);
  };

  /**
   * Método para refazer a busca na API de ônibus com uma nova página da paginação. 
   */
  const reloadBus = (page: number, perPage = 4) => {
    Backend.get(`${ApiRoutes.LIST_BUS}?size=${perPage}&page=${page}`).then(
      (res) => setBusPagination(res.data)
    );
  };

  /**
   * Esse useEffect é realizado para que sempre que a tela é carregada é feita a chamada 
   * na API de ônibus e setar o retorno da promise no estado de paginação dos ônibus.
   */
  useEffect(() => {
    Backend.get(`${ApiRoutes.LIST_BUS}?size=4&page=0`).then((res) =>
      setBusPagination(res.data)
    );
  }, []);

  return (
    <main className={styles.homeMain}>
      {isAdmin ? (
        <div className={styles.busDescription}>
          <p>É responsável por alguma rota de ônibus? Registre ela agora!</p>
          <Button
            onClick={redirectCreateBus}
            className="my-4"
            btnLabel="Cadastrar"
          />
        </div>
      ) : null}
      <div className={styles.busList}>
        <p>Veja agora os horários de ônibus:</p>
        {busPagination?.content.length === 0 || !busPagination?.content ? (
          <p style={{ color: "#fff" }}></p>
        ) : (
          <>
            <div className={styles.list}>
              {busPagination?.content.map((bus) => (
                <BusItem key={bus.id} bus={bus} />
              ))}
            </div>
            {busPagination && (
              <Pagination
                showTotal
                reloadItens={reloadBus}
                pagination={busPagination}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
