import Router from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { BusProps } from "../../interfaces";
import { Section } from "../../page-components/bus-page";
import { routesName } from "../../routes-name";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

const CreateBus: React.FC = WithAuth(() => {
  const { setTrue, setFalse } = useLoadingSpinner();

  const createBus = (data: BusProps) => {
    setTrue();
    Backend.post(ApiRoutes.CREATE_BUS, data)
      .then(() => {
        toast.success(`Ônibus criado com sucesso!`);
        Router.push(routesName.BUS);
      })
      .catch(showError)
      .finally(setFalse);
  };

  return (
    <div>
      <FixedHead title="Criar Ônibus" />
      <Section isCreate sendingData={createBus} />
    </div>
  );
}, true);

export default CreateBus;
