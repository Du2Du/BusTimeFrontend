import React from "react";
import { Input } from "../../components";
import styles from ".//Credentials.module.scss";

/**
 * Esse componente genérico pode renderizar
 *
 * @param param0
 * @author Du2Du
 */
export const Credentials: React.FC<{ isLogin?: boolean }> = ({
  isLogin = false,
}) => {
  const label = isLogin ? "Entrar" : "Registrar";
  const fields = [
    {
      label: "Nome",
    },
    {
      label: "Email",
    },
    {
      label: "Senha",
    },
  ];
  return (
    <div className={styles.credentials}>
      <div className={styles.formCredentials + " rounded text-dark"}>
        <h1>
          <b>{label}</b>
        </h1>
        {fields.map((field, idx) => (
          <div className={styles.fields} key={idx}>
            <label htmlFor={field.label}>{field.label}:</label>
            <Input placeholder={field.label} />
          </div>
        ))}
      </div>
    </div>
  );
};
