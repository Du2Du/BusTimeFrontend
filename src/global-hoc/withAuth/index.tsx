import Router, { useRouter } from "next/router";
import React, { FormEvent } from "react";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { useLoadingSpinner } from "../../hooks";
import { Button } from "../../page-components/credentials/components";
import { routesName } from "../../routes-name";
import styles from "./withAuth.module.scss";

export function WithAuth(
  Component: React.ComponentType,
  validateAdmin = false,
  validateSuperAdmin = false
) {
  function WrapperFunction(props: any) {
    const { userData, isAdmin, isSuperAdmin } = useUserContext();
    const { pathname } = useRouter();

    const isCredential =
      pathname === routesName.LOGIN ||
      pathname === routesName.REGISTER ||
      pathname === "/";

    if (isCredential)
      return !userData ? (
        <Component {...props} />
      ) : (
        <NotAuthentic isCredential={isCredential} />
      );
    else if (userData) {
      if (validateSuperAdmin)
        return isSuperAdmin ? (
          <Component {...props} />
        ) : (
          <NotAuthentic isCredential={true} />
        );

      if (validateAdmin) {
        return isAdmin ? (
          <Component {...props} />
        ) : (
          <NotAuthentic isCredential={true} />
        );
      }
      return <Component {...props} />;
    } else return <NotAuthentic isCredential={isCredential} />;
  }
  return WrapperFunction;
}

export const NotAuthentic: React.FC<{ isCredential: boolean }> = ({
  isCredential,
}) => {
  const { setTrue, setFalse } = useLoadingSpinner();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTrue();
    Router.push(isCredential ? routesName.HOME : routesName.LOGIN).finally(
      setFalse
    );
  };

  return (
    <>
      <FixedHead title="Não Autorizado" />
      <form
        onSubmit={onSubmit}
        className={`${styles.notAuth} rounded`}
        style={isCredential ? {} : { marginTop: "20%" }}
      >
        <p>Você não pode acessar esse recurso </p>
        <Button label="Voltar" />
      </form>
    </>
  );
};
