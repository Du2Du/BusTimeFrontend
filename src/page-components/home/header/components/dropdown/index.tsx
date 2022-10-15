import Link from "next/link";
import React from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineHeart,
  AiOutlineLock,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiBusSchool, BiDoorOpen, BiHomeAlt } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
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
          <Link href={routesName.PROFILE}>
            <a className={styles.link}>
              <CgProfile size={27} className={styles.faBrands} />
              Perfil
            </a>
          </Link>
        </li>
        {verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR) && (
          <li>
            <Link href={routesName.STATISTICS}>
              <a className={styles.link}>
                <VscGraph size={27} className={styles.faBrands} />
                Estatísticas
              </a>
            </Link>
          </li>
        )}
        {verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR) && (
          <li>
            <Link href={routesName.LOGS}>
              <a className={styles.link}>
                <AiOutlineAlignLeft size={27} className={styles.faBrands} />
                Logs
              </a>
            </Link>
          </li>
        )}
        {verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR) && (
          <li>
            <Link href={routesName.PERMISSIONS}>
              <a className={styles.link}>
                <AiOutlineLock size={27} className={styles.faBrands} />
                Permissões
              </a>
            </Link>
          </li>
        )}
        <li>
          <Link href={routesName.FAVORITE}>
            <a className={styles.link}>
              <AiOutlineHeart size={27} className={styles.faBrands} />
              Favoritos
            </a>
          </Link>
        </li>
        <li>
          <Link href={routesName.HOME}>
            <a className={styles.link}>
              <BiHomeAlt size={27} className={styles.faBrands} />
              Home
            </a>
          </Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link href={routesName.CREATE_BUS}>
                <a className={styles.link}>
                  <GiBusStop size={27} className={styles.faBrands} />
                  Cadastrar
                </a>
              </Link>
            </li>
            <li>
              <Link href={routesName.BUS}>
                <a className={styles.link}>
                  <BiBusSchool size={27} className={styles.faBrands} />
                  Ônibus
                </a>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href={routesName.LOGOUT}>
            <a className={styles.link}>
              <BiDoorOpen size={27} className={styles.faBrands} />
              Sair
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
