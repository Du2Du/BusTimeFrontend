import Router from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../api-routes";
import { Button, ButtonWithBorder, Input } from "../../../components";
import { useUserContext } from "../../../global-context";
import { useLoadingSpinner } from "../../../hooks";
import { BusProps } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import styles from "../BusPage.module.scss";

interface SectionParams {
  /**
   * A função que mandara o formulario para o backend
   */
  sendingData: (data: BusProps) => void;
  /**
   * Um boolean para saber se está criando um ônibus ou não
   */
  isCreate?: boolean;
  /**
   * Método para setar os novos estados
   */
  fieldValues?: any;
}

type BusType =
  | "lineBus"
  | "hour"
  | "ticketPrice"
  | "inicialRoute"
  | "finalRoute"
  | "busNumber";

/**
 * Esse componente renderiza a pagina de cadastro/atualização
 * de um ônibus.
 *
 * @author Du2Du
 */
export const Section: React.FC<SectionParams> = ({
  sendingData,
  isCreate = false,
  fieldValues,
}) => {
  const { register, handleSubmit, setValue } = useForm<BusProps>();
  const { setTrue, setFalse } = useLoadingSpinner();

  const createBus = (data: BusProps) => {
    setTrue();
    Backend.post(ApiRoutes.CREATE_BUS, data)
      .then(() => {
        toast.success(`Ônibus criado com sucesso!`);
        Router.push(routesName.BUS);
      })
      .catch(showError);
  };
  const { userData } = useUserContext();

  useEffect(() => {
    if (fieldValues) {
      const busFields: Array<BusType> = [
        "lineBus",
        "hour",
        "ticketPrice",
        "inicialRoute",
        "finalRoute",
        "busNumber",
      ];

      busFields?.forEach((field) => setValue(field, fieldValues[field]));
    }
  }, [fieldValues]);

  //Método que adiciona o id do usuario que está criando
  const addIdUserAdmin = (data: BusProps) => {
    if (userData?.id) {
      const newData = { ...data, idUserAdmin: userData.id };
      sendingData(newData);
    }
  };

  //Método que redireciona o usuario para tela de onibus
  const redirectBus = () => {
    Router.push(routesName.BUS);
  };

  return (
    <section className={styles.section}>
      <h1 className="text-3xl mb-3">
        {isCreate ? "Registre" : "Atualize"} agora uma Rota
      </h1>
      <form onSubmit={handleSubmit(addIdUserAdmin)} className="fields">
        <Input
          register={register("lineBus.lineName", {
            required: isCreate ? true : false,
          })}
          className="my-2"
          label="Linha"
          placeHolder="Linha"
        />
        <Input
          register={register("hour", { required: isCreate ? true : false })}
          className="my-2"
          label="Horário"
          placeHolder="Horário"
        />
        <Input
          register={register("ticketPrice", {
            required: isCreate ? true : false,
          })}
          className="my-2"
          label="Preço da Passagem"
          placeHolder="Preço da Passagem"
        />
        <Input
          register={register("inicialRoute", {
            required: isCreate ? true : false,
          })}
          className="my-2"
          label="Rota Inicial"
          placeholder="Rota Inicial"
        />
        <Input
          register={register("finalRoute", {
            required: isCreate ? true : false,
          })}
          className="my-2"
          label="Rota Final"
          placeHolder="Rota Final"
        />
        <Input
          register={register("busNumber", {
            required: isCreate ? true : false,
          })}
          className="my-2"
          label="Número"
          placeHolder="Número"
        />
        <Button
          type="submit"
          btnLabel={isCreate ? "Cadastrar" : "Salvar"}
          className="mb-4 mt-3"
        />
        {!isCreate && (
          <ButtonWithBorder
            type="button"
            onClick={redirectBus}
            btnLabel="Voltar"
            className="mb-4 ml-2 mt-3"
          />
        )}
      </form>
    </section>
  );
};
