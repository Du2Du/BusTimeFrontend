import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../../api-routes";
import { Pagination } from "../../../components";
import { BusProps, PaginationInterface } from "../../../interfaces";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import { BusItem } from "../../home/main/components";
import styles from "../SearchBus.module.scss";

export const List: React.FC = () => {
  const { query } = useRouter();
  const [page, setPage] = useState<number>(0);
  const line = query.line;
  const { data: bus } = useQuery<PaginationInterface<BusProps>>(
    ["busSearch", page, line],
    () => reloadItens(),
    { keepPreviousData: true }
  );

  const reloadItens = () => {
    return Backend.get(
      `${ApiRoutes.FILTER_BUS}?line=${line}&size=10&page=${page}`
    )
      .then((res) => res.data)
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
                <BusItem bus={ele} key={ele.id} />
              ))}
            </div>
            <Pagination
              reloadItens={(newPage) => setPage(newPage)}
              pagination={bus}
              showTotal
            />
          </>
        )
      )}
    </div>
  );
};
