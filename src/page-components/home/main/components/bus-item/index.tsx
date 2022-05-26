import React from "react";
import { BusProps } from "../../../../../interfaces";
import styles from "../../../Home.module.scss";

export const BusItem: React.FC<{ bus: BusProps }> = ({ bus }) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.fieldItem}>
        <b>Linha: </b>
        {bus.line}
      </div>
      <div className={styles.fieldItem}>
        <b>Hora: </b>
        {bus.hour}
      </div>
      <div className={styles.fieldItem}>
        <b>Passagem: </b>R${bus.ticketPrice}
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
    </div>
  );
};
