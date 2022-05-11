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
  userName?: FieldError | undefined;
  userEmail?: FieldError | undefined;
  userPassword?: FieldError | undefined;
  userCpf?: FieldError | undefined;
  userBirth?: FieldError | undefined;
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
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
  const buttonLabel = isLogin ? "ENTRAR" : "CADASTRAR";
  return (
    <>
      <h1 className="text-2xl">{label}</h1>
      {!isLogin && (
        <>
          <Input
            label="Nome"
            placeHolder="Nome"
            {...register("userName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            id="name"
            className={`${styles.credentialsInput} ${
              errors.userName ? styles.inputError : ""
            }`}
          />
          <Input
            label="CPF"
            placeHolder="CPF"
            {...register("userCpf", {
              required: true,
              pattern: /\d{3}\.\d{3}\.\d{3}\-\d{2}/g,
            })}
            id="name"
            className={`${styles.credentialsInput} ${
              errors.userCpf ? styles.inputError : ""
            }`}
          />
          <Input
            label="Data de Nascimento"
            placeHolder="Data de Nascimento"
            {...register("userBirth", {
              required: true,
              pattern: regexForDate,
            })}
            type="date"
            id="name"
            className={`${styles.credentialsInput} ${
              errors.userBirth ? styles.inputError : ""
            }`}
          />
        </>
      )}
      <Input
        label="Email"
        placeHolder="Email"
        {...register("userEmail", { required: true })}
        id="email"
        type="email"
        className={`${styles.credentialsInput} ${
          errors.userEmail ? styles.inputError : ""
        }`}
      />
      <Input
        label="Senha"
        placeHolder="Senha"
        id="password"
        {...register("userPassword", { required: true, min: 6 })}
        className={`${styles.credentialsInput} ${
          errors.userPassword ? styles.inputError : ""
        }`}
        type="password"
      />
      <Button
        label={buttonLabel}
        href={isLogin ? routesName.LOGIN : routesName.REGISTER}
      />
    </>
  );
};
