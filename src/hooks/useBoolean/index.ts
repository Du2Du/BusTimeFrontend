import { useState } from "react";

/**
 * Esse hook foi criado para facilitar o uso de useState com boolean
 *
 * @param initialValue Esse param pode receber true para o useState começar verdadeiro.
 * @author Du2Du
 */
export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((past) => !past);
  };

  const setTrue = () => {
    setValue(true);
  };
  const setFalse = () => {
    setValue(false);
  };

  return {
    value,
    setValue,
    toggle,
    setFalse,
    setTrue,
  };
};
