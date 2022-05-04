import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components";
import { useBoolean } from "../../hooks";
import styles from ".//Credentials.module.scss";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const { value: showPassword, toggle } = useBoolean();

  return (
    <div className={styles.credentials}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formCredentials + " rounded"}
      >
        <h1>
          <b className="text-light">{label}</b>
        </h1>
        {!isLogin && (
          <div className={styles.fields}>
            <label htmlFor="name">Nome:</label>
            <Input
              {...register("userName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              placeholder="Nome"
              className={`${
                errors.userName?.type
                  ? "border border-danger rounded"
                  : "rounded"
              }`}
            />
          </div>
        )}
        <div className={styles.fields}>
          <label htmlFor="email">Email:</label>
          <Input
            {...register("userEmail", { required: true })}
            placeholder="Email"
            className={`${
              errors.userEmail?.type
                ? "border border-danger rounded"
                : "rounded"
            }`}
          />
        </div>
        <div className={styles.fields}>
          <label htmlFor="pass">Senha:</label>
          <Input
            {...register("userPassword", { required: true, min: 6 })}
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className={`${
              errors.userPassword?.type
                ? "border border-danger rounded"
                : "rounded"
            }`}
          />
          <button onClick={toggle} className={styles.buttonShow}>
            {!showPassword ? "Mostrar" : "Esconder"}
          </button>
        </div>
        <button type="submit" className={styles.button}>
          {label}
        </button>
        <Link replace href={!isLogin ? "/login" : "/register"}>
          {!isLogin
            ? "Já tem login? Entre Aqui"
            : "Não tem cadastro? Cadastre Aqui"}
        </Link>
      </form>
    </div>
  );
};
