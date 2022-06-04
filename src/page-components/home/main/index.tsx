import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { Button } from "../../../components/button";
import { useUserContext } from "../../../global-context";
import { BusProps, PaginationInterface } from "../../../interfaces";
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
    Router.push("/create-bus");
  };
  const [bus, setBus] = useState<PaginationInterface<BusProps>>();

  useEffect(() => {
    Backend.get(ApiRoutes.LIST_BUS).then((res) => setBus(res.data));
  }, []);

  return (
    <main className={styles.homeMain}>
      <div className={styles.busList}>
        <p>Veja agora os horários de ônibus:</p>
        <div className={styles.list}>
          {bus?.content.length === 0 ? (
            <p>Nenhum ônibus a ser exibido</p>
          ) : (
            bus?.content.map((bus) => <BusItem key={bus.id} bus={bus} />)
          )}
        </div>
      </div>
      {userData?.isAdmin && (
        <div className={styles.busDescription}>
          <p>É responsável pela linha de ônibus? Registre ele agora!</p>
          <Button
            onClick={redirectCreateBus}
            extraCss="my-4"
            btnLabel="Cadastrar"
          />
        </div>
      )}
    </main>
  );
};
