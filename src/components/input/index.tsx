import React from "react";
import styles from "./Input.module.scss";
import { InputParam } from "./interface";

/**
 * Esse componente é responsável por renderizar
 * o campo de input
 *
 * @author Du2Du
 */
export const Input: React.FC<InputParam> = ({
  type = "text",
  className,
  placeHolder,
  label,
  id,
  register,
  ...rest
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={id}
        className={`${styles.textInput} ${className}`}
        placeholder={placeHolder}
        {...register}
        {...rest}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
