import React from "react";
import { ButtonParams } from "./interfaces";

/**
 * Esse componente renderiza um botão.
 *
 * @author Du2Du
 */
export const Button: React.FC<ButtonParams> = ({
  label,
  children,
  color,
  extraCss,
  ...rest
}) => {
  return (
    <button className={`btn btn-${color} ${extraCss}`} {...rest}>
      {label} {children}
    </button>
  );
};
