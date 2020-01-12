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

const Table = ({ config, data, onDelete, onApprove, onDeny, onEdit }) => {
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
    return (
      data &&
      data.map((element, index) => {
        return (
          <div className="table-row" key={index}>
            {renderTableCell(element, element.id)}
          </div>
        );
      })
    );
  };

  const renderTableCell = (element, id) => {
    const array = config.map(el => el.key);
    const ar = ["checkbox", ...array];
    return ar.map((key, index) => (
      <div
        className="table-cell"
        key={index}
        style={{ width: `calc(100% / ${config.length})` }}
      >
        {renderCellValue(key, element[key], id)}
      </div>
    ));
  };

  const renderCellValue = (key, element, id) => {
    const isChecked = selectedRow === id;
    switch (key) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              isChecked ? selectRow(null) : selectRow(id);
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
        <button
          className="btn btn-approve"
          type="button"
          onClick={() => onApprove(selectedRow)}
        >
          Approve
        </button>,
        <button
          className="btn btn-deny"
          type="button"
          onClick={() => onDeny(selectedRow)}
        >
          Deny
        </button>,
        <button
          className="btn btn-approve"
          type="button"
          onClick={() => onEdit(selectedRow)}
        >
          Edit
        </button>,
        <button
          className="btn btn-deny"
          type="button"
          onClick={() => onDelete(selectedRow)}
        >
          Delete
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
