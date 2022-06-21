import Router, { useRouter } from "next/router";
import React, { FormEvent, FormEventHandler, useEffect } from "react";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { Button } from "../../page-components/credentials/components";
import { routesName } from "../../routes-name";
import styles from "./withAuth.module.scss";

export function WithAuth<T>(
  Component: React.ComponentType<T>,
  validateAdmin = false
) {
  function WrapperFunction(props: T) {
    const { userData, getUser } = useUserContext();
    const { pathname } = useRouter();

    const isCredential =
      pathname === routesName.LOGIN ||
      pathname === routesName.REGISTER ||
      pathname === "/";

    useEffect(() => {
      if (!userData) getUser();
    }, [userData]);
    if (isCredential)
      return !userData ? (
        <Component {...props} />
      ) : (
        <NotAuthentic isCredential={isCredential} />
      );
    else if (userData) {
      if (validateAdmin) {
        return userData.isAdmin ? (
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
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Router.push(isCredential ? routesName.HOME : routesName.LOGIN);
  };

  return (
    <>
      <FixedHead title="Não Autorizado" />
      <form onSubmit={onSubmit} className={`${styles.notAuth} rounded`}>
        <p>Você não pode acessar esse recurso </p>
        <Button label="Voltar" />
      </form>
    </>
  );
};
