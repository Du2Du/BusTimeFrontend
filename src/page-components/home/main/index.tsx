import Router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../../api-routes";
import { Button, Pagination } from "../../../components";
import { useUserContext } from "../../../global-context";
import { useLoadingSpinner } from "../../../hooks";
import { BusProps, PaginationInterface } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import styles from "../Home.module.scss";
import { BusItem } from "./components";

/**
 * Esse componente renderiza o main da página Home.
 *
 * @author Du2Du
 */
export const Main: React.FC = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const { isAdmin } = useUserContext();
  const { setTrue, setFalse } = useLoadingSpinner();

  const { data: busPagination } = useQuery<PaginationInterface<BusProps>>(
    ["bus", page, perPage],
    () => {
      setTrue();
      return Backend.get(`${ApiRoutes.LIST_BUS}?size=${perPage}&page=${page}`)
        .then((res) => res.data)
        .catch(showError)
        .finally(setFalse);
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

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
  const reloadBus = (page: number, perPageProp?: number) => {
    setPage(page);
    if (perPageProp) setPerPage(perPageProp);
  };
  console.log(busPagination);
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
          <p style={{ color: "#fff" }}>Nenhum ônibus para ser listado</p>
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
