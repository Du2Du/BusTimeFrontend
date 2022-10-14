import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { LogsProps } from "../../interfaces";
import { Header } from "../../page-components/home";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

const Logs: React.FC = WithAuth(
  () => {
    const [logs, setLogs] = useState<Array<LogsProps>>([]);
    const { setTrue, setFalse } = useLoadingSpinner();

    useEffect(() => {
      setTrue();
      Backend.get(ApiRoutes.LOGS)
        .then((res: any) => setLogs(res.data))
        .catch(showError)
        .finally(setFalse);
    }, []);

    return (
      <div>
        <FixedHead title="Logs" />

        {logs.map((log) => (
          <p>{log.url}</p>
        ))}
      </div>
    );
  },
  true,
  true
);

export default Logs;
