import React from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { BusProps } from "../../interfaces";
import { Section } from "../../page-components/bus-page";
import { Header } from "../../page-components/home";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

const CreateBus: React.FC = WithAuth(() => {
  const createBus = (data: BusProps) => {
    Backend.post(ApiRoutes.CREATE_BUS, data)
      .then(() => {
        toast.success(`Ônibus criado com sucesso!`);
      })
      .catch(showError);
  };

  return (
    <div>
      <FixedHead title="Criar Ônibus" />
      <Header />
      <Section isCreate sendingData={createBus} />
    </div>
  );
}, true);

export default CreateBus;
