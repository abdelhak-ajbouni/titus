import React, { useEffect } from "react";
import { kea, useActions, useValues } from "kea";
import { navigate } from "@reach/router";
import axios from "axios";
import { get } from "lodash";

import "./summaryReport.scss";

const logic = kea({
  actions: () => ({
    setSummaryDate: summaryDate => ({ summaryDate }),
    setSummaryClaims: summaryClaims => ({ summaryClaims })
  }),

  reducers: ({ actions }) => ({
    summaryDate: [
      null,
      {
        [actions.setSummaryDate]: (state, payload) => payload.summaryDate
      }
    ],
    summaryClaims: [
      [],
      {
        [actions.setSummaryClaims]: (state, payload) => payload.summaryClaims
      }
    ]
  })
});

const SummaryReport = () => {
  const { summaryDate, summaryClaims } = useValues(logic);
  const { setSummaryDate, setSummaryClaims } = useActions(logic);

  useEffect(() => {
    getClaims(summaryClaims);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryDate]);

  const getClaims = () => {
    axios
      .get(
        "https://www.jsonstore.io/e3f724606c569fe15d8557f2a7c72a05b29f0e18b23784e2ce7b9261214f5c7c"
      )
      .then(function(response) {
        setSummaryClaims(
          get(response, "data.result", []).filter(
            el => el.date.substring(0, 7) === summaryDate
          ) || []
        );
      });
  };

  const renderSummary = () => {
    const totalAmount = summaryClaims.reduce((a, b) => a + +b.amount, 0);
    const totalApprovedAmount = summaryClaims
      .filter(el => el.status === "approved")
      .reduce((a, b) => a + +b.amount, 0);
    const highestAmountClaim = summaryClaims.reduce(
      (a, b) => (a.votes > b.votes ? a : b),
      {}
    );

    return (
      <div className="summary-report-details">
        <div className="summary-report-elem">
          <label className="summary-report-label">Total Amount:</label>
          <span>{totalAmount + "€"} </span>
        </div>
        <div className="summary-report-elem">
          <label className="summary-report-label">Total Approved Amount:</label>
          <span>{totalApprovedAmount + "€"}</span>
        </div>
        <label className="summary-report-label">
          Claim With The Highest Amount:
        </label>
        <div className="summary-report-highest">
          <label className="summary-report-label">Name:</label>
          <span>{highestAmountClaim.name}</span>
          <label className="summary-report-label">Amount:</label>
          <span className="summary-report-label">
            {highestAmountClaim.amount + "€"}
          </span>
          <label className="summary-report-label">Date:</label>
          <span className="summary-report-label">
            {highestAmountClaim.date}
          </span>
          <label className="summary-report-label">Description:</label>
          <span>{highestAmountClaim.description}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="summary-report">
      <header className="header">
        <h1 className="title">Summary</h1>
        <button className="btn" onClick={() => navigate("/claims")}>
          View Claims
        </button>
      </header>
      <label for="start">choose a date:</label>

      <input
        className="summary-report-input"
        type="month"
        id="start"
        name="start"
        value={summaryDate}
        onChange={e => setSummaryDate(e.target.value)}
      />

      {summaryClaims.length > 0 && renderSummary()}
    </div>
  );
};
export default SummaryReport;
