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
export const Main: React.FC<{
  busPagination?: PaginationInterface<BusProps>;
  setBusPagination: React.Dispatch<
    React.SetStateAction<PaginationInterface<BusProps> | undefined>
  >;
}> = ({ busPagination, setBusPagination }) => {
  const { isAdmin } = useUserContext();

  //Método que redireciona o usuário para a tela de registrar ônibus
  const redirectCreateBus = () => {
    Router.push(routesName.CREATE_BUS);
  };

  const reloadBus = (page: number, perPage = 4) => {
    Backend.get(`${ApiRoutes.BUS.LIST_BUS}?size=${perPage}&page=${page}`).then(
      (res) => setBusPagination(res.data)
    );
  };

  return (
    <main className={styles.homeMain}>
      {isAdmin && (
        <div className={styles.busDescription}>
          <p>É responsável por alguma rota de ônibus? Registre ela agora!</p>
          <Button
            onClick={redirectCreateBus}
            className="my-4"
            btnLabel="Cadastrar"
          />
        </div>
      )}
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
