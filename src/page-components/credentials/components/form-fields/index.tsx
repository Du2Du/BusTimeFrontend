import React from "react";
import {
  FieldError,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Fields } from "../..";
import { Input } from "../../../../components";
import { routesName } from "../../../../routes-name";
import styles from "../../Credentials.module.scss";
import { Button } from "../button";

interface Errors {
  name?: FieldError | undefined;
  email?: FieldError | undefined;
  password?: FieldError | undefined;
  cpf?: FieldError | undefined;
  birth_date?: FieldError | undefined;
}
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
  register: UseFormRegister<FieldValues & Fields>;
  /**
   * Esse param recebe os erros dos campos
   */
  errors: Errors;
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
  errors,
}) => {
  /* Esse regex é para a data de nascimento */
  const regexForDate =
    /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  const buttonLabel = isLogin ? "ENTRAR" : "CADASTRAR";

  return (
    <>
      <h1 className="text-2xl">{label}</h1>
      {!isLogin && (
        <>
          <Input
            label="Nome"
            placeHolder="Nome"
            register={register("name", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            id="name"
            className={`${styles.credentialsInput} ${
              errors.name ? styles.inputError : ""
            }`}
          />
          <Input
            label="CPF"
            placeHolder="CPF"
            register={register("cpf", {
              required: true,
              pattern: /\d{3}\.\d{3}\.\d{3}\-\d{2}/g,
            })}
            id="name"
            className={`${styles.credentialsInput} ${
              errors.cpf ? styles.inputError : ""
            }`}
          />
          <Input
            label="Data de Nascimento"
            placeHolder="Data de Nascimento"
            register={register("birthDate", {
              required: true,
              pattern: regexForDate,
            })}
            id="name"
            className={`${styles.credentialsInput} ${
              errors.birth_date ? styles.inputError : ""
            }`}
          />
        </>
      )}
      <Input
        label="Email"
        placeHolder="Email"
        register={register("email", { required: true })}
        id="email"
        type="email"
        className={`${styles.credentialsInput} ${
          errors.email ? styles.inputError : ""
        }`}
      />
      <Input
        label="Senha"
        placeHolder="Senha"
        id="password"
        register={register("password", { required: true, min: 6 })}
        className={`${styles.credentialsInput} ${
          errors.password ? styles.inputError : ""
        }`}
        type="password"
      />
      <Button label={buttonLabel} />
    </>
  );
};
