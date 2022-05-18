import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserContext } from "../../global-context";

export function WithAuth<T>(Component: React.ComponentType<T>) {
  function WrapperFunction(props: T) {
    const { userData, getUser } = useUserContext();
    const { pathname } = useRouter();

    const isCredential = pathname === "/login" || pathname === "/register";

    useEffect(() => {
      if (!userData) getUser();
    }, [userData]);
    if (isCredential)
      return !userData ? (
        <Component {...props} />
      ) : (
        <NotAuthentic isCredential={isCredential} />
      );
    return userData ? (
      <Component {...props} />
    ) : (
      <NotAuthentic isCredential={isCredential} />
    );
  }
  return WrapperFunction;
}

export const NotAuthentic: React.FC<{ isCredential: boolean }> = ({
  isCredential,
}) => {
  return (
    <div className="d-flex flex-column">
      Você não pode acessar esse Recurso{" "}
      <button
        onClick={() => Router.push(isCredential ? "/home" : "/login")}
        className="btn btn-primary"
      >
        Voltar
      </button>
    </div>
  );
};
