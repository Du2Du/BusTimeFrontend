import { get } from "lodash";
import { TableParams } from "../../interfaces";
import { Pagination } from "../pagination";
import styles from "./Table.module.scss";

export const Table = <T,>({
  headerTitle,
  columns,
  values,
  showPagination = false,
  paginationData,
  reloadItens,
  renderExtraHeaderComponent,
  showTotal = true,
}: TableParams<T>) => {
  const setBorder = (
    idx: number,
    length: number,
    field: string,
    color?: string
  ) => {
    return idx === length - 1
      ? {}
      : { [field]: `1px solid ${color ?? "#7e4ccb"}` };
  };

  return (
    <div className={styles.table}>
      <header className={styles.tableHeader}>
        <h1>{headerTitle}</h1>
        {renderExtraHeaderComponent}
      </header>

      <section className={styles.tableSection}>
        <div className={styles.tableSectionHeader}>
          {columns.map((column, idx) => (
            <div
              key={idx}
              style={setBorder(idx, columns.length, "borderRight", "#fff")}
              className={`col-lg-${column.size} ` + styles.columnHeader}
            >
              <div className={styles.column}>
                <b>{column.label}</b>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tableSectionBody}>
          {values.map((value, rowIdx) => (
            <div
              style={{ ...setBorder(rowIdx, values.length, "borderBottom") }}
              key={rowIdx}
              className={styles.columnRow}
            >
              {columns.map((column, idxColumn) => {
                const { name, size, renderColumn } = column;

                const rowValue = renderColumn
                  ? renderColumn(value)
                  : get(value, name);

                return (
                  <div
                    style={setBorder(idxColumn, columns.length, "borderRight")}
                    key={idxColumn}
                    className={`col-lg-${size} flex justify-center flex-wrap`}
                  >
                    <p>{rowValue}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      <footer className={styles.tableFooter}>
        {showPagination && paginationData && reloadItens && (
          <Pagination
            marginTop={2}
            pagination={paginationData}
            reloadItens={reloadItens}
            showTotal={showTotal}
          />
        )}
      </footer>
    </div>
  );
};
