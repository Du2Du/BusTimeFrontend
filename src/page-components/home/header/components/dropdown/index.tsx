import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiDoorOpen, BiBusSchool } from "react-icons/bi";
import styles from "./Dropdown.module.scss";

export const Dropdown: React.FC = () => {
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
          <a href="/bus">
            <BiBusSchool size={27} className={styles.faBrands} />
            Ônibus
          </a>
        </li>
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
