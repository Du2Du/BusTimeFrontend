import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return <input className={styles.input + ` ${className}`} {...rest} />;
};
