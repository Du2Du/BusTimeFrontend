import React from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "../../../../components";
import { routesName } from "../../../../routes-name";
import styles from "../../Credentials.module.scss";
import { Button } from "../button";

interface FormFieldsParams {
  /**
   * Esse param é a label que ficará no topo
   */
  label: string;
  /**
   * Esse param é um boolean que determinará
   * certos tipos de validação aqui
   */
  isLogin: boolean;
  /**
   * Esse param é o register do useForm()
   */
  register: UseFormRegister<FieldValues>;
}

/**
 * Esse componente é responsável por renderizar os campos do formulário
 * de cadastro/login
 *
 * @author Du2Du
 */
export const FormFields: React.FC<FormFieldsParams> = ({
  isLogin,
  label,
  register,
}) => {
  const buttonLabel = isLogin ? "ENTRAR" : "CADASTRAR";
  return (
    <>
      <h1 className="text-2xl">{label}</h1>
      {!isLogin && (
        <Input
          label="Nome"
          placeHolder="Nome"
          {...register("userName", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
          })}
          id="name"
          className={styles.credentialsInput}
        />
      )}
      <Input
        label="Email"
        placeHolder="Email"
        {...register("userEmail", { required: true })}
        id="email"
        className={styles.credentialsInput}
      />
      <Input
        label="Senha"
        placeHolder="Senha"
        id="password"
        {...register("userPassword", { required: true, min: 6 })}
        className={styles.credentialsInput}
        type="password"
      />
      <Button
        label={buttonLabel}
        href={isLogin ? routesName.LOGIN : routesName.REGISTER}
      />
    </>
  );
};
