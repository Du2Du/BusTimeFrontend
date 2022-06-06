import React, { useEffect, useState } from "react";

export const useLoadingSpinner = () => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const spinnerElement = document.querySelector(".hidenLdsEllipsis");

  useEffect(() => {
    if (loadingSpinner && spinnerElement) {
      spinnerElement.className = "lds-ellipsis";
    }
  }, [loadingSpinner]);

  const setTrue = () => {
    setLoadingSpinner(true);
  };

  const setFalse = () => {
    setLoadingSpinner(false);
  };

  const setToggle = () => {
    setLoadingSpinner((past) => !past);
  };

  return {
    loadingSpinner,
    setLoadingSpinner,
    setTrue,
    setFalse,
    setToggle,
  };
};
