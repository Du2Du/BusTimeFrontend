export interface ButtonParams
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  title?: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
}
