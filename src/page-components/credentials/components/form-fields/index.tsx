import React, { useEffect } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { Fields } from "../..";
import { Input } from "../../../../components";
import styles from "../../Credentials.module.scss";
import { Button } from "../button";

interface Errors {
  name?: FieldError | undefined;
  email?: FieldError | undefined;
  password?: FieldError | undefined;
  cpf?: FieldError | undefined;
  birthDate?: FieldError | undefined;
}

type FieldsName = "name" | "cpf" | "email" | "birthDate" | "password";

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

  const fieldsErros: FieldsName[] = [
    "name",
    "cpf",
    "birthDate",
    "email",
    "password",
  ];
  const fieldLabel = {
    name: { required: "O nome é obrigatório", pattern: "", min: "" },
    cpf: {
      required: "O cpf é obrigatório",
      pattern: "",
      min: "",
    },
    birthDate: {
      required: "A data de nascimento é obrigatória",
      pattern: "A data de nascimento deve ficar no formato dd/mm/yyyy",
      min: "",
    },
    email: { required: "O email é obrigatório", pattern: "", min: "" },
    password: {
      required: "A senha é obrigatória",
      pattern: "",
      min: "A senha deve ter no mínimo 6 dígitos",
    },
  };

  const showToast = (message: string) => {
    toast.error(message);
  };

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
            })}
            id="name"
            className={styles.credentialsInput}
          />
          <Input
            label="CPF"
            placeHolder="CPF"
            register={register("cpf", {
              required: true,
            })}
            id="cpf"
            className={styles.credentialsInput}
          />
          <Input
            label="Data de Nascimento"
            placeHolder="Data de Nascimento"
            register={register("birthDate", {
              required: true,
              pattern: regexForDate,
            })}
            id="date"
            className={styles.credentialsInput}
          />
        </>
      )}

      <Input
        label="Email"
        placeHolder="Email"
        register={register("email", { required: true })}
        id="email"
        type="email"
        className={styles.credentialsInput}
      />

      <Input
        label="Senha"
        placeHolder="Senha"
        id="password"
        register={register("password", { required: true, min: 6 })}
        className={styles.credentialsInput}
        type="password"
      />

      <Button
        onClick={() => {
          fieldsErros.forEach((field) => {
            if (errors[field]?.type === "required")
              return showToast(fieldLabel[field].required);
            if (errors[field]?.type === "pattern")
              return showToast(fieldLabel[field].pattern);
            if (errors[field]?.type === "min")
              return showToast(fieldLabel[field].min);
          });
        }}
        label={buttonLabel}
      />
    </>
  );
};
