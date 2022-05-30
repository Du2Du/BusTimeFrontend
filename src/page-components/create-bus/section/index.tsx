import React from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../api-routes";
import { Input } from "../../../components";
import { Button } from "../../../components/button";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import styles from "../CreateBus.module.scss";

export const Section: React.FC = () => {
  const createBus = () => {
    Backend.post(ApiRoutes.CREATE_BUS)
      .then(() => {
        toast.success("Ônibus criado com sucesso!");
      })
      .catch(showError);
  };

  return (
    <section className={styles.section}>
      <h1 className="text-3xl">Registre agora um ônibus</h1>
      <div className="fields">
        <div className={styles.field}>
          <label htmlFor="">Linha</label>
          <Input label="" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Horário</label>
          <Input label="" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Preço da Passagem</label>
          <Input label="" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Rota Inicial</label>
          <Input label="" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Rota Final</label>
          <Input label="" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Número </label>
          <Input label="" />
        </div>
      </div>
      <Button onClick={createBus} btnLabel="Cadastrar" extraCss="mb-6" />
    </section>
  );
};
