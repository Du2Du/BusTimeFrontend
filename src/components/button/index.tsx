import React from "react";
import { ButtonParams } from "./interfaces";

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
