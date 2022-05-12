import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputParam extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  label: string;
  placeHolder?: string;
}
