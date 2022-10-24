import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { useLoadingSpinner } from "../../hooks";
import { PermissionGroupInterface } from "../../interfaces";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";
import { PermissionGroup } from "./components";
import styles from "./PermissionsListMain.module.scss";

export const PermissionsListMain: React.FC = () => {
  const [permissionsGroup, setPermissionsGroup] = useState<
    Array<PermissionGroupInterface>
  >([]);
  const { setFalse, setTrue } = useLoadingSpinner();

  useEffect(() => {
    setTrue();
    Backend.get(ApiRoutes.LIST_GROUP_PERMISSIONS)
      .then((res) => setPermissionsGroup(res.data))
      .catch(showError)
      .finally(setFalse);
  }, []);

  return (
    <div className={styles.main}>
      <h1>Listagem de Permissões</h1>
      {permissionsGroup.map((ele) => (
        <PermissionGroup key={ele.id} permissionGroup={ele} keys={ele.id} />
      ))}
    </div>
  );
};
