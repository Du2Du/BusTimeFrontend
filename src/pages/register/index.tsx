import React from "react";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";

/**
 * Esse componente renderiza a tela de registro.
 *
 * @author Du2Du
 */
const Register: React.FC = () => {
  /*Essa função realiza o cadastro */
  const register = (data: any) => {};

  return (
    <>
      <FixedHead title="Registrar" />
      <Credentials onSubmit={register} />
    </>
  );
};

export default Register;
