import React, { useEffect } from "react";
import axios from "axios";
import { get } from "lodash";
import uniqid from "uniqid";
import { navigate } from "@reach/router";
import { kea, useActions, useValues } from "kea";

import Table from "./components/table";
import NewClaim from "./components/newClaim";

import "./expenseClaims.scss";

const logic = kea({
  actions: () => ({
    setClaims: claims => ({ claims }),
    setSelectedClaim: selectedClaim => ({ selectedClaim })
  }),

  reducers: ({ actions }) => ({
    claims: [
      [],
      {
        [actions.setClaims]: (state, payload) => payload.claims
      }
    ],
    selectedClaim: [
      null,
      {
        [actions.setSelectedClaim]: (state, payload) => payload.selectedClaim
      }
    ]
  })
});

const config = [
  { label: "Name", key: "name" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" }
];

const ExpenseClaims = () => {
  const { claims, selectedClaim } = useValues(logic);
  const { setClaims, setSelectedClaim } = useActions(logic);

  useEffect(() => {
    getClaims();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addClaims = claims => {
    axios
      .post(
        "https://www.jsonstore.io/e3f724606c569fe15d8557f2a7c72a05b29f0e18b23784e2ce7b9261214f5c7c",
        claims
      )
      .then(() => getClaims());
  };
  const getClaims = () => {
    axios
      .get(
        "https://www.jsonstore.io/e3f724606c569fe15d8557f2a7c72a05b29f0e18b23784e2ce7b9261214f5c7c"
      )
      .then(function(response) {
        setClaims(get(response, "data.result", []) || []);
      });
  };

  const handleOnAddClaim = newClaim => {
    addClaims([...claims, { ...newClaim, id: uniqid() }]);
  };

  const handleOnDelete = selectedRow => {
    const filteredClaims = claims.filter(({ id }) => id !== selectedRow);
    addClaims(filteredClaims);
  };

  const handleOnApprove = selectedRow => {
    const editedClaims = claims.map(elem => {
      if (elem.id === selectedRow) {
        return { ...elem, status: "approved" };
      } else {
        return elem;
      }
    });
    addClaims(editedClaims);
  };

  const handleOnDeny = selectedRow => {
    const editedClaims = claims.map(elem => {
      if (elem.id === selectedRow) {
        return { ...elem, status: "denied" };
      } else {
        return elem;
      }
    });
    addClaims(editedClaims);
  };

  const handleOnEdit = selectedRow => {
    setSelectedClaim(claims.find(({ id }) => id === selectedRow));
  };

  const handleOnUpdateClaim = updatedClaim => {
    const updatedClaims = claims.map(elem => {
      if (elem.id === updatedClaim.id) {
        return updatedClaim;
      } else {
        return elem;
      }
    });
    addClaims(updatedClaims);
    setSelectedClaim(null);
  };

  console.log("selectedClaim", selectedClaim);

  return (
    <div className="expense-claims">
      <header className="header">
        <h1 className="title">Claims</h1>
        <button className="btn" onClick={() => navigate("/summary")}>
          view summary
        </button>
      </header>

      <NewClaim
        onAddClaim={handleOnAddClaim}
        onUpdateClaim={handleOnUpdateClaim}
        data={selectedClaim}
      />
      <Table
        config={config}
        data={claims}
        onDelete={selectedRow => handleOnDelete(selectedRow)}
        onApprove={selectedRow => handleOnApprove(selectedRow)}
        onDeny={selectedRow => handleOnDeny(selectedRow)}
        onEdit={selectedRow => handleOnEdit(selectedRow)}
      />
    </div>
  );
};
export default ExpenseClaims;
