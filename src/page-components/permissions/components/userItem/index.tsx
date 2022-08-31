import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { ApiRoutes } from "../../../../api-routes";
import { useUserContext } from "../../../../global-context";
import { useLoadingSpinner } from "../../../../hooks";
import { PermissionsType, UserDataProps } from "../../../../interfaces";
import { Backend } from "../../../../services/backend";
import { PermissionsGroupName, showError } from "../../../../utils";
import styles from "../../Permissions.module.scss";

export const UserItem: React.FC<{ user: UserDataProps }> = ({ user }) => {
  const { userData } = useUserContext();
  if (!userData) return <></>;

  const [userIsAdmin, setUserIsAdmin] = useState<PermissionsType | undefined>(
    user?.permissionsGroup?.name
  );
  const { setFalse, setTrue } = useLoadingSpinner();

  const changeAdmin = (value: boolean, id: number) => {
    setTrue();
    Backend.get(`${ApiRoutes.CHANGE_ADMIN}/${id}?admin=${!value}`)
      .then((res: AxiosResponse<UserDataProps>) => {
        setUserIsAdmin(res.data.permissionsGroup?.name);
        console.log(res.data.permissionsGroup?.name);
      })
      .catch(showError)
      .finally(setFalse);
  };

  return (
    <div className={styles.userItem}>
      <div className={`flex`}>
        <b className="mx-2">Nome:</b>
        <p>{user.name}</p>
      </div>
      <div className={`flex`}>
        <b className="mx-2">Email:</b>
        <p>{user.email}</p>
      </div>
      <div className={`flex`}>
        <b className="mx-2">Administrador:</b>

        <input
          type="checkbox"
          onChange={(ev) => {
            changeAdmin(!ev.target.checked, user.id);
          }}
          checked={
            userIsAdmin === PermissionsGroupName.ADMINISTRATOR ? true : false
          }
        />
      </div>
    </div>
  );
};
