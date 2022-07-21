import { useEffect, useState } from "react";
import { useBoolean } from "../useBoolean";

export const useLoadingSpinner = () => {
  const {
    value: loadingSpinner,
    setValue: setLoadingSpinner,
    setTrue,
    toggle,
  } = useBoolean(false);

  //Função do useEffect que irá dizer se o spinner era ser visível ou não
  useEffect(() => {
    const spinnerElement = document.querySelector(".loading");
    if (spinnerElement) {
      if (!loadingSpinner) spinnerElement.id = "hidenLdsEllipsis";
      else spinnerElement.id = "lds-ellipsis";
    }

    //Não sei explicar essa lógica de validação muito bem kkk, so fui fazendo os teste até dar certo

    console.log(spinnerElement, loadingSpinner);
  }, [loadingSpinner]);

  const setFalse = () => {
    setTimeout(() => {
      setLoadingSpinner(false);
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
