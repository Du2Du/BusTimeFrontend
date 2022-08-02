import { useEffect, useState } from "react";
import { useBoolean } from "../useBoolean";

export const useLoadingSpinner = () => {
  const {
    value: loadingSpinner,
    setValue: setLoadingSpinner,
    setTrue,
    setFalse: setFalseSpinner,
    toggle,
  } = useBoolean(false);

  //Função do useEffect que irá dizer se o spinner era ser visível ou não
  useEffect(() => {
    const spinnerElement = document.querySelector(".loading");
    if (!spinnerElement) return;
    if (!loadingSpinner) spinnerElement.id = "hidenLdsEllipsis";
    else spinnerElement.id = "lds-ellipsis";
  }, [loadingSpinner]);

  const setFalse = () => {
    setTimeout(() => {
      setFalseSpinner();
    }, 1000);
  };

  return {
    loadingSpinner,
    setLoadingSpinner,
    setTrue,
    setFalse,
    toggle,
  };
};
