import type { NextPage } from "next";
import Router from "next/router";
import { ButtonWithBorder, FixedHead } from "../components";
import { WithAuth } from "../global-hoc";
import { routesName } from "../routes-name";
import styles from "../styles/Dashboard.module.scss";

/**
 * Esse componente renderiza a pagina Inicial da aplicação.
 *
 * @author Du2Du
 */
const Home: NextPage = WithAuth(() => {
  /**
   * Função que redireciona o usuário para a url de registro
   */
  const redirect = (url: string) => () => {
    Router.push(url);
  };

  return (
    <>
      <FixedHead title="Bus Time" />
      <div className={styles.home}>
        <section className={`${styles.section} flex flex-col items-center`}>
          <main
            className={`${styles.main} flex flex-col lg:flex-row justify-center items-center`}
          >
            <div className="text-center lg:text-left">
              <h1 className={styles.title}>
                <b>
                  Venha Agora e Confira os Horários de Ônibus o mais Rápido
                  Póssivel
                </b>
              </h1>
              <p className={`${styles.paragraph} mt-4`}>
                O melhor site para encontrar os melhores horários de ônibus em
                Luziânia!
              </p>
              <div>
                <button
                  onClick={redirect(routesName.REGISTER)}
                  className={`${styles.buttonRegister} py-1 rounded my-3 text-white`}
                >
                  Cadastrar
                </button>
                <ButtonWithBorder
                  onClick={redirect(routesName.LOGIN)}
                  btnLabel="Logar"
                  className="mx-4"
                  style={{ padding: "5px 10px" }}
                />
              </div>
            </div>
            <img src="/bus.svg" />
          </main>
          <a
            target="_blank"
            className="mt-4"
            rel="noreferrer"
            href="https://storyset.com/ethnicity"
          >
            Ethnicity illustrations by Storyset
          </a>
        </section>
      </div>
    </>
  );
});

export default Home;