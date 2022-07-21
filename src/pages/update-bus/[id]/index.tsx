import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiRoutes } from "../../../api-routes";
import { FixedHead } from "../../../components";
import { useUserContext } from "../../../global-context";
import { WithAuth } from "../../../global-hoc";
import { useLoadingSpinner } from "../../../hooks";
import { BusProps } from "../../../interfaces";
import { Section } from "../../../page-components/bus-page";
import { Header } from "../../../page-components/home";
import { Backend } from "../../../services/backend";
import { showError } from "../../../utils";

const UpdateBus: React.FC = WithAuth(() => {
  const { userData } = useUserContext();
  const [fieldValues, setFieldValues] = useState<BusProps>();
  const { setTrue, setFalse } = useLoadingSpinner();
  const router = useRouter();
  const busId = router.query.id;

  const updateBus = (data: BusProps) => {
    setTrue();
    Backend.put(`${ApiRoutes.CREATE_BUS}/${busId}`, {
      ...data,
      id: busId,
    })
      .then(() => {
        toast.success(`Ônibus atualizado com sucesso!`);
      })
      .catch(showError)
      .finally(setFalse);
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
      <Section fieldValues={fieldValues} sendingData={updateBus} />
    </div>
  );
}, true);

export default UpdateBus;
