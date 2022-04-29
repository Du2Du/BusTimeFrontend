import React from "react";
import { FixedHead } from "../../components";
import { Credentials } from "../../page-components";

/**
 * Esse componente renderiza a tela de registro.
 *
 * @author Du2Du
 */
const Register: React.FC = () => {
  return (
    <>
      <FixedHead title="Registrar" />
      <Credentials />
    </>
  );
};

export default Register;
