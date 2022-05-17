import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserContext } from "../../global-context";

export function WithAuth<T>(Component: React.ComponentType<T>) {
  function WrapperFunction(props: T) {
    const { userData, getUser } = useUserContext();
    const { pathname } = useRouter();

    useEffect(() => {
      if (!userData) getUser();
    }, [userData]);
    if (pathname === "/login" || pathname === "/register")
      return !userData ? (
        <Component {...props} />
      ) : (
        <>Você não pode acessar esse Recurso</>
      );
    return userData ? <Component {...props} /> : <>Carregando</>;
  }
  return WrapperFunction;
}
