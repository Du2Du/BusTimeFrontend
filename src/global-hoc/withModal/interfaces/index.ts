import { Dispatch, SetStateAction } from "react";

export interface StateModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
export interface ModalProps extends StateModalProps {
  label: string;
  validate: (ev: any) => void;
}
