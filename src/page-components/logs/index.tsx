import React, { useState, useEffect } from "react";
import { ApiRoutes } from "../../api-routes";
import { Button, Table } from "../../components";
import { useLoadingSpinner } from "../../hooks";
import { ColumnsProps, LogsProps } from "../../interfaces";
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
      size: 2,
    },
    {
      label: "Hora",
      name: "date",
      size: 3,
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
  const [logs, setLogs] = useState<
    Array<Omit<LogsProps, "time"> & { date: string }>
  >([]);
  const { setTrue, setFalse } = useLoadingSpinner();

  const loadLogs = () => {
    setTrue();
    Backend.get(ApiRoutes.LOGS)
      .then((res: { data: Array<LogsProps> }) =>
        setLogs(() =>
          res.data.map((log) => ({
            ...log,
            date: formatDateWithHour(log.time),
          }))
        )
      )
      .catch(showError)
      .finally(setFalse);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className={styles.logs}>
      <Button btnLabel="Atualizar" onClick={loadLogs} className="mb-5 "/>
      <div className={styles.tableLogs}>
        <Table<Omit<LogsProps, "time"> & { date: string }>
          headerTitle="Logs"
          values={logs}
          columns={columns}
        />
      </div>
    </div>
  );
};
