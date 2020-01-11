import React from "react";

import Table from "./components/table";

import "./expenseClaims.scss";

const config = [
  { label: "Name", key: "name" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" }
];

const data = [
  {
    name: "Mark",
    date: "10/10/2020",
    description: "description here",
    amount: 50,
    status: "approved"
  },
  {
    name: "Frank",
    date: "10/10/2020",
    description: "description here",
    amount: 50,
    status: "denied"
  }
];

const ExpenseClaims = () => {
  return (
    <div className="expense-claims">
      <Table config={config} data={data} />
    </div>
  );
};
export default ExpenseClaims;
