import { AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import React from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

const StatisticsComponent = dynamic(
  () => import("../../page-components/statistics"),
  {
    ssr: false,
  }
);
export interface StatisticsProps {
  lineName: string;
  savedQuantity: number;
}

const Statistics: React.FC = WithAuth(
  () => {
    const { setFalse, setTrue } = useLoadingSpinner();
    const { data: statistics } = useQuery<StatisticsProps[]>(
      "statistics",
      () => {
        setTrue();
        return Backend.get(ApiRoutes.GET_BUS_STATISTICS)
          .then((res) => res.data)
          .catch(showError)
          .finally(setFalse);
      }
    );

    return !statistics ? null : (
      <>
        <FixedHead title="Estatísticas" />
        <div
          className="flex flex-col justify-center w-100 h-100"
          style={{ alignItems: "center", margin: "auto", minWidth: "90%" }}
        >
          <p
            className="self-start mb-10"
            style={{ fontSize: "30px", color: "#7e4ccb" }}
          >
            Índice das Linhas de Ônibus Salvos:
          </p>
          <StatisticsComponent statistics={statistics} />
        </div>
      </>
    );
  },
  true,
  true
);

export default Statistics;
