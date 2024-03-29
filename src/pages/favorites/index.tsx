import React from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../api-routes";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { BusProps } from "../../interfaces";
import { BusItem } from "../../page-components/home/main/components";
import { Backend } from "../../services/backend";
import styles from "../../styles/Favorites.module.scss";
import { showError } from "../../utils";

const Favorites: React.FC = WithAuth(() => {
  const { setTrue, setFalse } = useLoadingSpinner();
  const { data: favoriteBus, refetch } = useQuery<BusProps[]>(
    "favoritesBus",
    () => {
      setTrue();
      return Backend.get(ApiRoutes.LIST_FAVORITE_BUS)
        .then((res) => res.data)
        .catch(showError)
        .finally(setFalse);
    }
  );

  return (
    <>
      <FixedHead title="Favoritos" />
      <div>
        <h2 className={styles.title}>Ônibus Favoritos</h2>
        <div className={styles.listBusStyle}>
          {!favoriteBus || favoriteBus.length === 0 ? (
            <h2
              className="text-center"
              style={{ fontSize: "20px", color: "#7e4ccb", width: "100%" }}
            >
              Nenhum ônibus favoritado
            </h2>
          ) : (
            favoriteBus.map((bus) => (
              <BusItem key={bus.id} bus={bus} refetch={refetch} />
            ))
          )}
        </div>
      </div>
    </>
  );
});

export default Favorites;
