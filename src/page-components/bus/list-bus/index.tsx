import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../api-routes";
import { BusProps } from "../../../interfaces";
import { Backend } from "../../../services/backend";
import { BusItem } from "../../home/main/components";
import styles from "../Bus.module.scss";

export const ListAllBus: React.FC = () => {
  const [bus, setBus] = useState<Array<BusProps>>([]);

  useEffect(() => {
    Backend.get(ApiRoutes.LIST_BUS_USER).then((res) => setBus(res.data));
  }, []);

  return (
    <main className={styles.mainBus}>
      {bus.map((element) => (
        <BusItem bus={element} />
      ))}
    </main>
  );
};
