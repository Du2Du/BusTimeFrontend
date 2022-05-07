import React from "react";
import styles from "./Button.module.scss";

interface ButtonParams {
  href: string;
  label: string;
}

/**
 * Esse componente é responsável por renderizar o botão
 * do formulário de cadsatro/login
 *
 * @param href Esse param é responsável por receber o link
 * que irá redirecionar o usuário
 *
 * @author Du2DU
 */
export const Button: React.FC<ButtonParams> = ({ href, label }) => {
  return (
    <button type="submit" className={styles.button}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {label}
    </button>
  );
};
