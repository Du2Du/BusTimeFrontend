import Router from "next/router";
import React from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";
import { Fields } from "../../page-components/credentials";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

/**
 * Esse componente renderiza a tela de registro.
 *
 * @author Du2Du
 */
const Register: React.FC = () => {
  /*Essa função realiza o cadastro */
  const register = (data: Fields) => {
    const { email, password } = data;
    const dataLogin = { email, password };
    Backend.post(ApiRoutes.CREATE_USER, data)
      .then(() => {
        /*Essa função realiza o login apos o cadastro */
        Backend.post(ApiRoutes.LOGIN_USER, dataLogin)
          .then(() => {
            Router.push("/home");
          })
          .catch(showError);
      })
      .catch(showError);
  };

  return (
    <>
      <FixedHead title="Registrar" />
      <Credentials onSubmit={register} />
    </>
  );
};

export default Register;
