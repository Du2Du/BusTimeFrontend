import Router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
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
  const [page, setPage] = useState<number>(0);
  const { setTrue, setFalse } = useLoadingSpinner();
  const { data: usersList } = useQuery<PaginationInterface<UserDataProps>>(
    ["userPermissions", page],
    () => reloadItens(),
    { keepPreviousData: true }
  );
  const reloadItens = () => {
    setTrue();
    return Backend.get(`${ApiRoutes.LIST_USERS}?&size=5&page=${page}`)
      .then((res) => res.data)
      .catch(showError)
      .finally(setFalse);
  };

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
        <Pagination
          pagination={usersList}
          reloadItens={(newPage) => {
            setPage(newPage);
          }}
        />
      )}
    </div>
  );
};
