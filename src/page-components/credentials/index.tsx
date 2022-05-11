import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { routesName } from "../../routes-name";
import styles from "./Credentials.module.scss";
import { FormFields } from "./components";

interface CredentialsParams {
  /**
   * Esse param recebe o submit ao clicar no botão
   */
  onSubmit: (data: any) => void;
  /**
   * Esse param é um booleano que verifica qual componente deve
   * renderizar
   */
  isLogin?: boolean;
}

export interface Fields {
  userName: string;
  userEmail: string;
  userPassword: string;
  userCpf: string;
  userBirth: Date;
}

/**
 * Esse componente genérico pode renderizar
 *
 * @param param0
 * @author Du2Du
 */
export const Credentials: React.FC<CredentialsParams> = ({
  onSubmit,
  isLogin = false,
}) => {
  const label = isLogin ? "Entrar" : "Registrar";
  const linkLabel = !isLogin
    ? "Já tem login? Entre Aqui"
    : "Não tem cadastro? Cadastre Aqui";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  return (
    <div className={styles.credentials}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.formCredentials} rounded`}
      >
        <FormFields
          isLogin={isLogin}
          label={label}
          errors={errors}
          register={register}
        />
      </form>
      <div className={styles.redirect}>
        <Link replace href={!isLogin ? routesName.LOGIN : routesName.REGISTER}>
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};
