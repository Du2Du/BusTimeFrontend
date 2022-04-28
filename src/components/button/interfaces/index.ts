import { ButtonHTMLAttributes, ReactNode } from "react";
import { BootstrapColors } from "../../../interfaces";

export interface ButtonParams
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Esse param recebe o texto dentro do botão
   */
  label?: string;
  /**
   * Esse param recebe algum Componente/icon dentro do botão
   */
  children?: ReactNode;
  /**
   * Esse param recebe a cor do botão
   */
  color: BootstrapColors;
  /**
   * Esse param recebe a class bootstrap que irá estilizar o botão
   */
  extraCss?: string;
}
