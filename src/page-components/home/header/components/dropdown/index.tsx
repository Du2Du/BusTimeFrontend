import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../../../../../global-context";
import styles from "./Dropdown.module.scss";
import { get } from "lodash";
import { AllIcons } from "../../../../../utils/allIcons";

export const Dropdown: React.FC = () => {
  const { menus } = useUserContext();
  console.log(menus);
  
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
            <li id={String(id)}>
              <Link href={url}>
                <a className={styles.link}>
                  <IconName size={27} className={styles.faBrands} />
                  {menuName}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
