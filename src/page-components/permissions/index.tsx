import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../api-routes";
import { Button, Pagination } from "../../components";
import { useLoadingSpinner } from "../../hooks";
import { PaginationInterface, UserDataProps } from "../../interfaces";
import { routesName } from "../../routes-name";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";
import { UserItem } from "./components";
import styles from "./Permissions.module.scss";

export const PermissionsMain: React.FC = () => {
  const [usersList, setUsersList] =
    useState<PaginationInterface<UserDataProps>>();
  const { setTrue, setFalse } = useLoadingSpinner();

  const reloadItens = (page = 0) => {
    setTrue();
    Backend.get(`${ApiRoutes.USER.LIST_USERS}?&size=5&page=${page}`)
      .then((res) => {
        setUsersList(res.data);
      })
      .catch(showError)
      .finally(setFalse);
  };

  useEffect(() => {
    reloadItens();
  }, []);

  return (
    <div className={styles.permissions}>
      <Button
        className="mb-3"
        btnLabel="Listar Permissões"
        onClick={() => Router.push(routesName.PERMISSIONS_LIST)}
      />
      <div className={styles.usersList}>
        {usersList?.content.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      {usersList && (
        <Pagination pagination={usersList} reloadItens={reloadItens} />
      )}
    </div>
  );
};
