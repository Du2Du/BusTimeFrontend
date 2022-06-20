import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../api-routes";
import { FixedHead } from "../../../components";
import { useUserContext } from "../../../global-context";
import { WithAuth } from "../../../global-hoc";
import { BusProps } from "../../../interfaces";
import { Section } from "../../../page-components/bus-page";
import { Header } from "../../../page-components/home";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";

const CreateBus: React.FC = WithAuth(() => {
  const { userData } = useUserContext();
  const [fieldValues, setFieldValues] = useState<BusProps>();
  const router = useRouter();
  const busId = router.query.id;

  const createBus = (data: BusProps) => {
    Backend.put(`${ApiRoutes.CREATE_BUS}/${busId}`, {
      ...data,
      id: busId,
    })
      .then(() => {
        toast.success(`Ônibus atualizado com sucesso!`);
      })
      .catch(showError);
  };

  useEffect(() => {
    if (busId)
      Backend.get(`${ApiRoutes.LIST_BUS}/${busId}`)
        .then((res: AxiosResponse<BusProps>) => {
          const bus = res.data;
          setFieldValues(bus);
        })
        .catch(showError);
  }, [busId]);

  return (
    <div>
      <FixedHead title="Atualizar Ônibus" />
      <Header />
      <Section fieldValues={fieldValues} sendingData={createBus} />
    </div>
  );
}, true);

export default CreateBus;
