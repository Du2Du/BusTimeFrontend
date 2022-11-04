import { AxiosResponse } from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../../api-routes";
import { Select } from "../../../../components";
import { OptionsProps } from "../../../../components/select";
import { useUserContext } from "../../../../global-context";
import { useLoadingSpinner } from "../../../../hooks";
import { PermissionsType, UserDataProps } from "../../../../interfaces";
import { Backend } from "../../../../services/backend";
import { PermissionsGroupName, showError } from "../../../../utils";
import styles from "../../Permissions.module.scss";

export const UserItem: React.FC<{ user: UserDataProps }> = ({ user }) => {
  const { userData } = useUserContext();

  const [userPermissionGroup, setUserPermissionGroup] = useState<
    PermissionsType | undefined
  >(user?.permissionsGroup?.name);
  const { setFalse, setTrue } = useLoadingSpinner();

  const groupOptions: OptionsProps[] = [
    {
      label: "Passageiro",
      value: PermissionsGroupName.DEFAULT,
    },
    {
      label: "Administrador",
      value: PermissionsGroupName.ADMINISTRATOR,
    },
    {
      label: "Super Administrador",
      value: PermissionsGroupName.SUPER_ADMINISTRATOR,
    },
  ];

  const changeAdmin = (ev: any) => {
    setTrue();
    Backend.put(`${ApiRoutes.CHANGE_ADMIN}/${user.id}`, {
      permissionGroup: ev.currentTarget.value,
    })
      .then((res: AxiosResponse<UserDataProps>) => {
        setUserPermissionGroup(res.data.permissionsGroup?.name);
        toast.success("Permissão alterada com sucesso!");
      })
      .catch(showError)
      .finally(setFalse);
  };

  return userData ? (
    <div className={styles.userItem}>
      <div className={`flex`}>
        <b className="mx-2">Nome:</b>
        <p>{user.name}</p>
      </div>
      <div className={`flex`}>
        <b className="mx-2">Email:</b>
        <p>{user.email}</p>
      </div>
      <div>
        <Select
          initialValue={userPermissionGroup ?? PermissionsGroupName.DEFAULT}
          onChange={changeAdmin}
          options={groupOptions}
          extraCss="ml-2 my-1"
        />
      </div>
    </div>
  ) : null;
};
