import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components";
import { Button } from "../../../components/button";
import { useUserContext } from "../../../global-context";
import { BusProps } from "../../../interfaces";
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
  | "line"
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
  const { register, handleSubmit, setValue, getValues } = useForm<BusProps>();

  const { userData } = useUserContext();

  useEffect(() => {
    if (fieldValues) {
      const busFields: Array<BusType> = [
        "line",
        "hour",
        "ticketPrice",
        "inicialRoute",
        "finalRoute",
        "busNumber",
      ];

      busFields?.forEach((field: BusType) =>
        setValue(field, fieldValues[field])
      );
    }
  }, [fieldValues]);

  //Método que adiciona o id do usuario que está criando
  const addIdUserAdmin = (data: BusProps) => {
    if (userData?.id) {
      const newData = { ...data, idUserAdmin: userData.id };
      sendingData(newData);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className="text-3xl mb-3">
        {isCreate ? "Registre" : "Atualize"} agora um ônibus
      </h1>
      <form onSubmit={handleSubmit(addIdUserAdmin)} className="fields">
        <Input
          register={register("line", { required: isCreate ? true : false })}
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
            valueAsNumber: true,
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
          extraCss="mb-4   mt-3"
        />
      </form>
    </section>
  );
};
