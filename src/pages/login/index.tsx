import React from "react";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";

/**
 * Esse componente renderiza a tela de login.
 *
 * @author Du2Du
 */
const Login: React.FC = () => {
  /*Essa função realiza o login do usuário */
  const login = (data: any) => {};

  return (
    <>
      <FixedHead title="Entrar" />
      <Credentials isLogin onSubmit={login} />
    </>
  );
};

export default Login;
