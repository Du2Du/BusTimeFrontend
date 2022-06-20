import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { Pagination } from "../../../components";
import { BusProps, PaginationInterface } from "../../../interfaces";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import { BusItem } from "../../home/main/components";
import styles from "../SearchBus.module.scss";

export const List: React.FC = () => {
  const [bus, setBus] = useState<Array<BusProps>>();
  const { query } = useRouter();
  const line = query.line;

  useEffect(() => {
    reloadItens();
  }, [line]);

  const reloadItens = () => {
    Backend.get(`${ApiRoutes.FILTER_BUS}?line=${line}`)
      .then((res) => setBus(res.data))
      .catch(showError);
  };

  return (
    <div className={styles.listAll}>
      <h1>Rotas da linha: {line}</h1>
      {bus?.length === 0 ? (
        <h2 className={`${styles.not} mt-3`}>
          Nenhuma Rota de Ônibus encontrado
        </h2>
      ) : (
        bus && (
          <>
            <div className={styles.list}>
              {bus.map((ele) => (
                <div className={styles.item} key={ele.id}>
                  <BusItem bus={ele} />
                </div>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};
