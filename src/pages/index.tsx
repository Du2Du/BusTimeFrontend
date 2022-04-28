import type { NextPage } from "next";
import Router from "next/router";
import BusSvg from "../../public/bus.svg";
import { Button, FixedHead } from "../components";
import styles from "../styles/Home.module.scss";

/**
 * Esse componente renderiza a pagina Inicial da aplicação.
 *
 * @author Du2Du
 */
const Home: NextPage = () => {
  const redirectRegister = () => {
    Router.push("/register");
  };

  return (
    <>
      <FixedHead title="Bus Time" />
      <div className={styles.home}>
        <section
          className={`${styles.section} d-flex flex-column align-items-center`}
        >
          <main className="d-flex flex-column flex-lg-row align-items-center">
            <div className="text-center text-lg-start">
              <h1 className={styles.title}>
                <b>
                  Venha Agora e Confira os Horários de Ônibus o mais Rápido
                  Póssivel
                </b>
              </h1>
              <p className={styles.paragraph + " mt-4"}>
                O melhor site para encontrar os melhores horários de ônibus em
                Luziânia!
              </p>
              <button
                onClick={redirectRegister}
                className={
                  styles.buttonRegister + " py-1 rounded  my-3 text-light"
                }
              >
                Cadastrar
              </button>
            </div>
            <BusSvg />
          </main>
          <a
            target="_blank"
            className="mt-5"
            href="https://storyset.com/ethnicity"
          >
            Ethnicity illustrations by Storyset
          </a>
        </section>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
