import { get } from "lodash";
import React from "react";
import { PermissionGroupInterface } from "../../../../interfaces";
import styles from "../../PermissionsListMain.module.scss";

export const PermissionGroup: React.FC<{
  keys: number;
  permissionGroup: PermissionGroupInterface;
}> = ({ keys, permissionGroup }) => {
  const transformGroupName = {
    DEFAULT: "Passageiro",
    ADMINISTRATOR: "Administrador",
    SUPER_ADMINISTRATOR: "Super Administrador",
  };

  return (
    <main className={styles.mainWrap}>
      <div className={styles.mainInner}>
        <ul className={styles.accor}>
          <li>
            <input
              type="checkbox"
              name="accordion"
              id={`off-accor${keys}`}
              className={styles.offAccor}
            />
            <label htmlFor={`off-accor${keys}`} className={styles.accorTitle}>
              <span>{get(transformGroupName, permissionGroup.name)}</span>
              <span className={styles.icon}></span>
            </label>
            {permissionGroup.permissionList.length === 0 ? (
              <div className={styles.accorContent}>
                <p>Nenhuma permissão vinculada a esse perfil de usuário</p>
              </div>
            ) : (
              permissionGroup.permissionList.map((permission) => (
                <div className={styles.accorContent}>
                  <p>{permission.permissionName}</p>
                  <hr />
                </div>
              ))
            )}
          </li>
        </ul>
      </div>
    </main>
  );
};
