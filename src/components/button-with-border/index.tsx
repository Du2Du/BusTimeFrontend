import React from "react";
import { ButtonParams } from "../button/interface";
import styles from "./ButtonWithBorder.module.scss";

/**
 * Esse componente renderiza o botão com bordas.
 *
 * @author Du2Du
 */
export const ButtonWithBorder: React.FC<ButtonParams> = ({
  buttonRef,
  disabled,
  type,
  onClick,
  className,
  children,
  btnLabel,
  style,
  ...rest
}) => {
  return (
    <button
      ref={buttonRef}
      disabled={disabled === undefined ? false : disabled}
      onClick={onClick}
      type={type}
      style={style}
      className={`${styles.buttonBorder} ${className ? className : ""}`}
      {...rest}
    >
      {children}
      {btnLabel && <span>{btnLabel}</span>}
    </button>
  );
};
