import React from "react";
import styles from "./Select.module.scss";

export interface OptionsProps {
  value: string | number;
  label: string;
}

interface SelectParams {
  title?: string;
  options: Array<OptionsProps>;
  onChange: (ev: any) => void;
  initialValue: string | number;
  extraCss?: string;
}

export const Select: React.FC<SelectParams> = ({
  title,
  extraCss,
  options,
  onChange,
  initialValue,
}) => {
  return (
    <div className={styles.container}>
      {title && (
        <h2>
          <b className="mx-2">{title}</b>
        </h2>
      )}
      <select
        className={`${styles.decorated} ${extraCss}`}
        value={initialValue}
        onChange={onChange}
      >
        {options.map((ele, idx) => (
          <option className={styles.option} key={idx} value={ele.value}>
            {ele.label}
          </option>
        ))}
      </select>
    </div>
  );
};
