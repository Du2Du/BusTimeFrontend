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
  const [bus, setBus] = useState<PaginationInterface<BusProps>>();
  const { query } = useRouter();
  const line = query.line;

  useEffect(() => {
    reloadItens();
  }, []);

  const reloadItens = (page = 0) => {
    Backend.get(`${ApiRoutes.SEARCH_BUS}?size=10&page=${page}`)
      .then((res) => setBus(res.data))
      .catch(showError);
  };

  return (
    <div className={styles.listAll}>
      <h1>Rotas da linha: {line}</h1>
      {bus?.content.length === 0 ? (
        <h2 className={`${styles.not} mt-3`}>
          Nenhuma Rota de Ônibus encontrado
        </h2>
      ) : (
        bus && (
          <>
            <div className={styles.list}>
              {bus.content.map((ele) => (
                <div className={styles.item} key={ele.id}>
                  <BusItem bus={ele} />
                </div>
              ))}
            </div>
            <Pagination showTotal pagination={bus} reloadItens={reloadItens} />
          </>
        )
      )}
    </div>
  );
};
