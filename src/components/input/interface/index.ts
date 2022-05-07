import { InputHTMLAttributes } from "react";
import { string } from "yup";

export interface InputParam extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  label: string;
  placeHolder?: string;
}
