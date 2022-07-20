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
  const { userData } = useUserContext();

  //Método que redireciona o usuário para a tela de registrar ônibus
  const redirectCreateBus = () => {
    Router.push(routesName.CREATE_BUS);
  };
  const [bus, setBus] = useState<PaginationInterface<BusProps>>();

  const reloadBus = (page: number, perPage = 3) => {
    Backend.get(`${ApiRoutes.LIST_BUS}?size=${perPage}&page=${page}`).then(
      (res) => setBus(res.data)
    );
  };

  useEffect(() => {
    reloadBus(0);
  }, []);

  return (
    <main className={styles.homeMain}>
      {userData?.isAdmin && (
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
        {bus?.content.length === 0 || !bus?.content ? (
          <p style={{ color: "#fff" }}>Nenhum ônibus a ser exibido</p>
        ) : (
          <>
            <div className={styles.list}>
              {bus?.content.map((bus) => (
                <BusItem key={bus.id} bus={bus} />
              ))}
            </div>
            {bus && (
              <Pagination showTotal reloadItens={reloadBus} pagination={bus} />
            )}
          </>
        )}
      </div>
    </main>
  );
};
