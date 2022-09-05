import React from "react";
import { AiOutlineHeart, AiOutlineLock, AiOutlineMenu } from "react-icons/ai";
import { BiBusSchool, BiDoorOpen, BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiBusStop } from "react-icons/gi";
import { useUserContext } from "../../../../../global-context";
import { routesName } from "../../../../../routes-name";
import { PermissionsGroupName } from "../../../../../utils";
import styles from "./Dropdown.module.scss";

export const Dropdown: React.FC = () => {
  const { verifyPermissionsGroup, isAdmin } = useUserContext();
  return (
    <div className={styles.dropdown}>
      <a className={styles.label}>
        <AiOutlineMenu size={20} />
      </a>
      <ul className={styles.items}>
        <li>
          <a href={routesName.PROFILE}>
            <CgProfile size={27} className={styles.faBrands} />
            Perfil
          </a>
        </li>
        {verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR) && (
          <li>
            <a href={routesName.PERMISSIONS}>
              <AiOutlineLock size={27} className={styles.faBrands} />
              Permissões
            </a>
          </li>
        )}
        <li>
          <a href={routesName.FAVORITE}>
            <AiOutlineHeart size={27} className={styles.faBrands} />
            Favoritos
          </a>
        </li>
        <li>
          <a href={routesName.HOME}>
            <BiHomeAlt size={27} className={styles.faBrands} />
            Menu
          </a>
        </li>
        {isAdmin && (
          <>
            <li>
              <a href={routesName.CREATE_BUS}>
                <GiBusStop size={27} className={styles.faBrands} />
                Cadastrar
              </a>
            </li>
            <li>
              <a href={routesName.BUS}>
                <BiBusSchool size={27} className={styles.faBrands} />
                Ônibus
              </a>
            </li>
          </>
        )}
        <li>
          <a href={routesName.LOGOUT}>
            <BiDoorOpen size={27} className={styles.faBrands} />
            Sair
          </a>
        </li>
      </ul>
    </div>
  );
};
