import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { routesName } from "../../routes-name";
import { formatCPF, validateCPF, verifyCpfFormat } from "../../utils/string";
import { FormFields } from "./components";
import styles from "./Credentials.module.scss";

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
  name: string;
  email: string;
  password: string;
  birthDate: string;
  cpf: string;
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

  //Função que irá validar quais informações devem ir para o backend
  const handleData = (data: Fields) => {
    if (!isLogin) {
      const cpfWithoutPoint = data.cpf.replace(/\./g, "").replace("-", "");
      if (
        (verifyCpfFormat(data.cpf) && !data.cpf.match("[0-9]+")) ||
        verifyCpfFormat(data.cpf) ||
        !validateCPF(cpfWithoutPoint)
      )
        return toast.error("Digite um CPF válido!");
      const formattedCPF = formatCPF(cpfWithoutPoint);
      return onSubmit({ ...data, cpf: formattedCPF });
    }

    const { email, password } = data;
    const dataLogin = { email, password };

    return onSubmit(dataLogin);
  };

  return (
    <div className={styles.credentials}>
      <form
        onSubmit={handleSubmit(handleData)}
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
