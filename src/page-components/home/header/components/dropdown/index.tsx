import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiBusSchool, BiDoorOpen, BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useUserContext } from "../../../../../global-context";
import styles from "./Dropdown.module.scss";

export const Dropdown: React.FC = () => {
  const { userData } = useUserContext();
  return (
    <div className={styles.dropdown}>
      <a className={styles.label}>
        <AiOutlineMenu size={20} />
      </a>
      <ul className={styles.items}>
        <li>
          <a href="/profile">
            <CgProfile size={27} className={styles.faBrands} />
            Perfil
          </a>
        </li>
        <li>
          <a href="/home">
            <BiHomeAlt size={27} className={styles.faBrands} />
            Menu
          </a>
        </li>
        {userData?.isAdmin && (
          <li>
            <a href="/bus">
              <BiBusSchool size={27} className={styles.faBrands} />
              Ônibus
            </a>
          </li>
        )}
        <li>
          <a href="/logout">
            <BiDoorOpen size={27} className={styles.faBrands} />
            Sair
          </a>
        </li>
      </ul>
    </div>
  );
};
