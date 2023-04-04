import React, { useState } from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../api-routes";
import { Button, Table } from "../../components";
import { useLoadingSpinner } from "../../hooks";
import { ColumnsProps, LogsProps, PaginationInterface } from "../../interfaces";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";
import { formatDateWithHour } from "../../utils/date";
import styles from "./Logs.module.scss";

const columns: Array<ColumnsProps<Omit<LogsProps, "time"> & { date: string }>> =
  [
    {
      label: "Método",
      name: "method",
      size: 1,
    },
    {
      label: "Url",
      name: "url",
      size: 3,
    },
    {
      label: "Hora",
      name: "date",
      size: 2,
    },
    {
      label: "Status",
      name: "urlStatus",
      size: 2,
    },
    {
      label: "Usuário",
      name: "userForm",
      renderColumn: (values) => {
        if (values.userForm === null) return "";
        const userSplited = values.userForm.split(",");

        const email = userSplited[1].slice(8, userSplited[1].length - 1);
        const id = userSplited[2].slice(4);
        const permission = userSplited[3].slice(18, userSplited[3].length - 1);

        return (
          <div className="flex flex-col my-2">
            <p>{`ID: ${id}`}</p>
            <p>{`Email: ${email}`}</p>
            <p>{`Permissão: ${permission}`}</p>
          </div>
        );
      },
      size: 4,
    },
  ];

export const SectionLogs: React.FC = ({}) => {
  const { setTrue, setFalse } = useLoadingSpinner();
  const [page, setPage] = useState<number>(0);
  const { data: logs } = useQuery<
    PaginationInterface<Omit<LogsProps, "time"> & { date: string }>
  >(["logs", page], () => loadLogs(), { keepPreviousData: true });

  const loadLogs = () => {
    setTrue();
    return Backend.get(`${ApiRoutes.LOGS}?page=${page}&size=10`)
      .then((res: { data: PaginationInterface<LogsProps> }) => ({
        ...res.data,
        content: res.data.content.map((log) => ({
          ...log,
          date: formatDateWithHour(log.time),
        })),
      }))
      .catch(showError)
      .finally(setFalse) as Promise<
      PaginationInterface<Omit<LogsProps, "time"> & { date: string }>
    >;
  };

  return (
    <div className={styles.logs}>
      {logs && (
        <div className={styles.tableLogs}>
          <Table<Omit<LogsProps, "time"> & { date: string }>
            headerTitle="Logs"
            values={logs?.content}
            showTotal={false}
            showPagination={true}
            renderExtraHeaderComponent={
              <Button btnLabel="Atualizar" onClick={() => loadLogs()} />
            }
            paginationData={logs}
            reloadItens={(newPage) => {
              setPage(newPage);
            }}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
};
