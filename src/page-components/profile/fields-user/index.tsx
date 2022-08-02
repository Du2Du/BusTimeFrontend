import Router from "next/router";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../api-routes";
import {
  Button,
  ButtonWithBorder,
  CheckboxInput,
  SimpleInput,
} from "../../../components";
import { useUserContext } from "../../../global-context";
import { useLoadingSpinner } from "../../../hooks";
import { UserDataProps } from "../../../interfaces";
import { routesName } from "../../../routes-name";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";
import styles from "../Profile.module.scss";

type UserData = "name" | "email" | "cpf" | "birthDate" | "id";

export const FieldsUser: React.FC<{ isUpdate?: boolean }> = ({
  isUpdate = false,
}) => {
  const { userData, getUser } = useUserContext();
  const { register, handleSubmit, setValue } = useForm<UserDataProps>();
  const { setTrue, setFalse } = useLoadingSpinner();

  //Método para atualizar os dados
  const updateUser = (data: UserDataProps) => {
    if (isUpdate && userData?.id) {
      setTrue();
      Backend.put(`${ApiRoutes.UPDATE_USER}/${userData.id}`, {
        ...data,
        id: userData.id,
      })
        .then((res) => {
          toast.success("Perfil atualizado com sucesso!");
          Router.push(routesName.PROFILE);
          getUser();
        })
        .catch(showError)
        .finally(setFalse);
    }
  };

  const updateValues = (user = userData) => {
    if (user?.id) {
      const userFields: Array<UserData> = [
        "name",
        "email",
        "cpf",
        "birthDate",
        "id",
      ];

      //Constante para formatar a data de nascimento.
      const birthDate = new Date(user.birthDate);
      const birthDay = birthDate.getUTCDate();
      const birthMonth = String(birthDate.getMonth() + 1);
      const birthYear = birthDate.getFullYear();
      var newBirthMonth = "";

      //Adicionando o zero a esquerda
      if (birthMonth.length === 1) newBirthMonth = `0${birthMonth}`;

      const birthDateFormat = `${birthDay}/${newBirthMonth}/${birthYear}`;

      userFields.forEach((field) => {
        if (field === "birthDate") return setValue(field, birthDateFormat);
        return setValue(field, user[field]);
      });
    }
  };

  useEffect(() => {
    updateValues();
  }, [userData]);

  const redirectUser = (isUpdate: boolean) => () => {
    setTrue();
    Router.push(!isUpdate ? routesName.PROFILE : routesName.PROFILE_UPDATE);
  };

  return (
    <form onSubmit={handleSubmit(updateUser)} className={styles.form}>
      <div className="flex flex-col items-center">
        <h2 className={styles.title}>Dados Pessoais</h2>
        {!isUpdate && (
          <Button
            className="mt-3 "
            btnLabel="Alterar"
            onClick={redirectUser(true)}
          />
        )}
      </div>
      <div className={styles.fieldsUser}>
        <div className={styles.fields}>
          <label>Nome:</label>
          <SimpleInput
            className={styles.input}
            disabled={isUpdate ? false : true}
            register={register("name")}
          />
        </div>
        <div className={styles.fields}>
          <label>E-mail:</label>
          <SimpleInput
            className={styles.input}
            disabled={isUpdate ? false : true}
            register={register("email")}
          />
        </div>
        <div className={styles.fields}>
          <label>CPF:</label>
          <SimpleInput
            className={styles.input}
            disabled={isUpdate ? false : true}
            register={register("cpf")}
          />
        </div>
        <div className={styles.fields}>
          <label>Data de Nascimento:</label>
          <SimpleInput
            className={styles.input}
            disabled={isUpdate ? false : true}
            register={register("birthDate")}
          />
        </div>
      </div>
      {isUpdate && (
        <div className="flex">
          <Button type="submit" btnLabel="Salvar" />
          <ButtonWithBorder
            onClick={redirectUser(false)}
            className="ml-3"
            type="button"
            btnLabel="Voltar"
          />
        </div>
      )}
    </form>
  );
};
