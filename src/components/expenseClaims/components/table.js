import React from "react";
import { kea, useActions, useValues } from "kea";

const logic = kea({
  actions: () => ({
    selectRow: selectedRow => ({ selectedRow })
  }),

  reducers: ({ actions }) => ({
    selectedRow: [
      null,
      {
        [actions.selectRow]: (state, payload) => payload.selectedRow
      }
    ]
  })
});

const Table = ({ config, data }) => {
  const { selectedRow } = useValues(logic);
  const { selectRow } = useActions(logic);

  const renderTableHeader = () => {
    const cn = [{ label: "", key: "checkbox" }, ...config];
    return cn.map(({ label, key }, index) => (
      <div
        key={index}
        className="table-header-cell"
        style={{ width: `calc(100% / ${config.length})` }}
      >
        {label}
      </div>
    ));
  };

  const renderTableRows = () => {
    return data.map((element, rowIndex) => {
      return (
        <div className="table-row" key={rowIndex}>
          {renderTableCell(element, rowIndex)}
        </div>
      );
    });
  };

  const renderTableCell = (element, rowIndex) => {
    const array = Object.keys(element);
    const ar = ["checkbox", ...array];
    return ar.map((key, index) => (
      <div
        className="table-cell"
        key={index}
        style={{ width: `calc(100% / ${config.length})` }}
      >
        {renderCellValue(key, element[key], rowIndex)}
      </div>
    ));
  };

  const renderCellValue = (key, element, rowIndex) => {
    const isChecked = selectedRow === rowIndex;
    switch (key) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              isChecked ? selectRow(null) : selectRow(rowIndex);
            }}
          />
        );
      case "amount":
        return element + "€";
      case "status":
        return <label className={element}>{element}</label>;

      default:
        return element;
    }
  };

  const renderTableActions = () => {
    let actions = [];
    if (selectedRow !== null)
      actions = [
        <button className="btn-approve" type="button">
          Approve
        </button>,
        <button className="btn-deny" type="button">
          Deny
        </button>
      ];
    return actions;
  };

  return (
    <div className="table">
      <div className="table-actions">{renderTableActions()}</div>
      <div className="table-header">{renderTableHeader()}</div>
      {renderTableRows()}
    </div>
  );
};
export default Table;
