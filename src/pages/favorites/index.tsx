import React, { useEffect, useState } from "react";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { WithAuth } from "../../global-hoc";
import { useLoadingSpinner } from "../../hooks";
import { Header } from "../../page-components/home";
import { BusItem } from "../../page-components/home/main/components";
import styles from "../../styles/Favorites.module.scss";

const Favorites: React.FC = WithAuth(() => {
  const { userData } = useUserContext();
  const { setTrue, setFalse } = useLoadingSpinner();
  const [favoriteBus, setFavoriteBus] = useState(userData?.favoriteBus);

  useEffect(() => {
    setTrue();
    if (favoriteBus) setFalse();
  }, [favoriteBus]);
  return (
    <>
      <FixedHead title="Favoritos" />
      <Header />
      <h2 className={styles.title}>Ônibus Favoritos</h2>
      <div className={styles.listBusStyle}>
        {!favoriteBus || favoriteBus.length === 0 ? (
          <h2 style={{ fontSize: "20px" }}>Nenhum ônibus favoritado </h2>
        ) : (
          favoriteBus.map((bus) => (
            <BusItem key={bus.id} bus={bus} setFavoriteBus={setFavoriteBus} />
          ))
        )}
      </div>
    </>
  );
});

export default Favorites;
