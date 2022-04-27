import { ButtonHTMLAttributes, ReactNode } from "react";
import { BootstrapColors } from "../../../interfacesGlobais";

export interface ButtonParams
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  children?: ReactNode;
  color: BootstrapColors;
  extraCss?: string;
}
