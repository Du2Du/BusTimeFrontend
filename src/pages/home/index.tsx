import Router from "next/router";
import React, { useEffect } from "react";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { WithAuth } from "../../global-hoc";
import { Main } from "../../page-components/home";
import styles from "../../page-components/home/Home.module.scss";

/**
 * Esse componente é responsável por carregar a página Home.
 * Componentes da Página:
 * 
 * - Listagem de ônibus.
 * - Botão para redirecionar o usuario para a tela de criação de ônibus. Acessando ela somente se for administrador
 *
 * @author Du2Du
 */
const Home: React.FC = WithAuth(() => {
  const { userData } = useUserContext();

  /**
   * Esse useEffect foi criado para que se os dados do usuario forem perdidos ou não foi carregado
   * devidamente, ele recarrega a página para conseguir recuperar os dados.
   */
  useEffect(() => {
    if (!userData) Router.reload();
  }, [userData]);
  
  return (
    <div className={styles.home}>
      <FixedHead title="Home" />
      <Main />
    </div>
  );
});

export default Home;
