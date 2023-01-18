import { AxiosResponse } from "axios";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ApiRoutes } from "../../../../../api-routes";
import { useUserContext } from "../../../../../global-context";
import { useLoadingSpinner } from "../../../../../hooks";
import { BusProps } from "../../../../../interfaces";
import { Backend } from "../../../../../services/backend";
import { showError } from "../../../../../utils";
import { formatToLocalCurrency } from "../../../../../utils/string";
import styles from "../../../Home.module.scss";
interface BusItemProps {
  bus: BusProps;
  setFavoriteBus?: React.Dispatch<React.SetStateAction<BusProps[]>>;
}

export const BusItem: React.FC<BusItemProps> = ({ bus, setFavoriteBus }) => {
  const { setTrue, setFalse } = useLoadingSpinner();
  const { userData, getUser } = useUserContext();
  const [currentFavoriteBus, setCurrentFavoriteBus] = useState(
    userData?.favoriteBus.find((favoriteBus) => bus.id === favoriteBus.id)
  );

  const favoriteBus =
    (isFavorite = true) =>
    () => {
      setTrue();
      Backend.get(
        `${isFavorite ? ApiRoutes.FAVORITE_BUS : ApiRoutes.DISFAVOR_BUS}/${
          bus.id
        }/${!isFavorite ? userData?.id : ""}`
      )
        .then((res: AxiosResponse<Array<BusProps>>) => {
          if (setFavoriteBus) setFavoriteBus(res.data);
          setCurrentFavoriteBus(
            res.data.find((favoriteBus) => bus.id === favoriteBus.id)
          );
          toast.success(
            `Ônibus ${isFavorite ? "favoritado" : "desfavoritado"} com sucesso!`
          );
          getUser();
        })
        .catch(showError)
        .finally(setFalse);
    };

  return (
    <div className={styles.listItem}>
      <div className={styles.fieldItem}>
        <b>Linha: </b>
        {bus.lineBus.lineName}
      </div>
      <div className={styles.fieldItem}>
        <b>Horário: </b>
        {bus.hour}
      </div>
      <div className={styles.fieldItem}>
        <b>Passagem: </b>
        {formatToLocalCurrency(String(bus.ticketPrice))}
      </div>
      <div className={styles.fieldItem}>
        <b>Rota Incial: </b>
        {bus.inicialRoute}
      </div>
      <div className={styles.fieldItem}>
        <b>Rota Final: </b>
        {bus.finalRoute}
      </div>
      <div className={styles.fieldItem}>
        <b>Número: </b>
        {bus.busNumber}
      </div>
      <div className={styles.fieldItem}>
        {!currentFavoriteBus ? (
          <AiOutlineHeart
            className="cursor-pointer"
            size={30}
            onClick={favoriteBus()}
          />
        ) : (
          <AiFillHeart
            size={30}
            className="cursor-pointer"
            onClick={favoriteBus(false)}
          />
        )}
      </div>
    </div>
  );
};
