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
 * Esse componente renderiza a tela de registro.
 *
 * @author Du2Du
 */
const Register: React.FC = WithAuth(() => {
  const { setTrue, setFalse } = useLoadingSpinner();

  /*Essa função realiza o cadastro */
  const register = (data: Fields) => {
    setTrue();
    const { email, password } = data;
    const dataLogin = { email, password };
    Backend.post(ApiRoutes.CREATE_USER, data)
      .then(() => {
        setTrue();

        /*Essa função realiza o login apos o cadastro */
        Backend.post(ApiRoutes.LOGIN_USER, dataLogin)
          .then(() => {
            Router.push(routesName.HOME);
          })
          .catch(showError)
          .finally(setFalse);
      })
      .catch(showError)
      .finally(setFalse);
  };

  return (
    <>
      <FixedHead title="Registrar" />
      <Credentials onSubmit={register} />
    </>
  );
});

export default Register;
