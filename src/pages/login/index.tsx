import React from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";
import { Fields } from "../../page-components/credentials";
import { Backend } from "../../services/backend";

/**
 * Esse componente renderiza a tela de login.
 *
 * @author Du2Du
 */
const Login: React.FC = () => {
  /*Essa função realiza o login do usuário */
  const login = (data: { email: string; password: string }) => {
    Backend.post(ApiRoutes.LOGIN_USER, data);
  };

  return (
    <>
      <FixedHead title="Entrar" />
      <Credentials isLogin onSubmit={login} />
    </>
  );
};

export default Login;
