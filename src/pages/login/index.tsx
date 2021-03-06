import Router from "next/router";
import React from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { Credentials } from "../../page-components";
import { Fields } from "../../page-components/credentials";
import { routesName } from "../../routes-name";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

/**
 * Esse componente renderiza a tela de login.
 *
 * @author Du2Du
 */
const Login: React.FC = WithAuth(() => {
  const { setTrue, setFalse } = useLoadingSpinner();

  /*Essa função realiza o login do usuário */
  const login = (data: { email: string; password: string }) => {
    setTrue();
    Backend.post(ApiRoutes.LOGIN_USER, data)
      .then(() => Router.push(routesName.HOME))
      .catch(showError)
      .finally(setFalse);
  };

  return (
    <>
      <FixedHead title="Entrar" />
      <Credentials isLogin onSubmit={login} />
    </>
  );
});

export default Login;
