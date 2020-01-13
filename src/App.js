import React from "react";
import { Router, Redirect } from "@reach/router";

import ExpenseClaims from "./components/expenseClaims";
import SummaryReport from "./components/summaryReport";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/claims" />
        <ExpenseClaims path="claims" />
        <SummaryReport path="summary" />
      </Router>
    </div>
  );
}

export default App;
