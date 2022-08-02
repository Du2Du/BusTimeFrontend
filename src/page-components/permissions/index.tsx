import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { useLoadingSpinner } from "../../hooks";
import { UserDataProps } from "../../interfaces";
import { Backend } from "../../services/backend";
import { PermissionsGroupName, showError } from "../../utils";
import { UserItem } from "./components";
import styles from "./Permissions.module.scss";

export const PermissionsMain: React.FC = () => {
  const [usersList, setUsersList] = useState<Array<UserDataProps>>([]);
  const { setTrue, setFalse } = useLoadingSpinner();

  useEffect(() => {
    setTrue();
    Backend.get(ApiRoutes.LIST_USERS)
      .then((res) => {
        setUsersList(res.data);
      })
      .catch(showError)
      .finally(setFalse);
  }, []);

  return (
    <div>
      <div className={styles.usersList}>
        {usersList?.map(
          (user) =>
            user.permissionsGroup.name !==
              PermissionsGroupName.SUPER_ADMINISTRATOR && (
              <UserItem key={user.id} user={user} />
            )
        )}
      </div>
    </div>
  );
};
