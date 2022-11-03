import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../../../../../global-context";
import styles from "./Dropdown.module.scss";
import { get } from "lodash";
import { AllIcons } from "../../../../../utils/allIcons";

export const Dropdown: React.FC = () => {
  const { menus } = useUserContext();

  return (
    <div className={styles.dropdown}>
      <a className={styles.label}>
        <AiOutlineMenu size={20} />
      </a>
      <ul className={styles.items}>
        {menus.map((menu) => {
          const { iconName, id, url, menuName } = menu;
          const IconName = get(AllIcons, iconName);
          return (
            <li key={id} id={String(id)}>
              <Link className={styles.link} href={url}>
                <IconName size={27} className={styles.faBrands} />
                {menuName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
