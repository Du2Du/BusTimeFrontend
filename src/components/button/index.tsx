import React from "react";
import { ButtonParams } from "./interface";
import styles from "./Button.module.scss";
/**
 *
 * @param btnLabel A label que ficará dentro do botão, esta String é opcional.
 * @param btnColor A cor do bootstrap que deseja aplicar ao campo. Não é necessario usar o prefixo 'btn', Ex.: 'outline-success' ou 'success'.
 * @param extraCss Uma String extra de estilização a ser passada para o ```<button />``` do componente.
 * @param children use o children para passar algo extra para dentro do componente, o children ficará antes da label do botão.
 * @param onClick A função de click do botão.
 * @param type Uma String com o tipo do botão, por padrão será utilizado o tipo ```button```,use os mesmos tipos do html, e.g.: 'submit'.
 * @param disabled Boolean que informa se o campo está disabilitado, é opcional.
 *
 * @author Du2Du
 **/
export const Button: React.FC<ButtonParams> = ({
  buttonRef,
  disabled,
  type,
  onClick,
  extraCss,
  children,
  btnLabel,
  ...rest
}) => {
  return (
    <button
      ref={buttonRef}
      disabled={disabled === undefined ? false : disabled}
      type={type || "button"}
      onClick={onClick}
      className={`${styles.button} ${extraCss ? extraCss : ""}`}
      {...rest}
    >
      {children}
      {btnLabel && <span>{btnLabel}</span>}
    </button>
  );
};
