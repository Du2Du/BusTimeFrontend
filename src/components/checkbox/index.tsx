import React from "react";
import { InputParam } from "../input/interface";

/**
 * Esse componente é responsável por renderizar
 * o campo de input de checkbox
 *
 * @author Du2Du
 */
export const CheckboxInput: React.FC<Omit<InputParam, "label">> = ({
  className,
  placeHolder,
  id,
  register,
  ...rest
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={`${className}`}
        placeholder={placeHolder}
        {...register}
        {...rest}
      />
    </div>
  );
};
