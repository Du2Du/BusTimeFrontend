import React from "react";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";
import { Fields } from "../../page-components/credentials";
import { Backend } from "../../services/backend";

/**
 * Esse componente renderiza a tela de registro.
 *
 * @author Du2Du
 */
const Register: React.FC = () => {
  /*Essa função realiza o cadastro */
  const register = (data: Fields) => {
    Backend.post(ApiRoutes.CREATE_USER, data);
  };

  return (
    <>
      <FixedHead title="Registrar" />
      <Credentials onSubmit={register} />
    </>
  );
};

export default Register;
