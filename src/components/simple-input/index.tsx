import React from "react";
import { InputParam } from "../input/interface";
import styles from "./SimpleInput.module.scss";

/**
 * Esse componente é responsável por renderizar
 * o campo de input sem o label flutuando
 *
 * @author Du2Du
 */
export const SimpleInput: React.FC<Omit<InputParam, "label">> = ({
  type = "text",
  className,
  placeHolder,
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
    </div>
  );
};
