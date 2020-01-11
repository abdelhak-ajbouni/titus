import React from "react";
import { kea, useActions, useValues } from "kea";
import "./App.scss";

const counterLogic = kea({
  actions: () => ({
    increment: amount => ({ amount }),
    decrement: amount => ({ amount })
  }),

  reducers: ({ actions }) => ({
    counter: [
      0,
      {
        [actions.increment]: (state, payload) => state + payload.amount,
        [actions.decrement]: (state, payload) => state - payload.amount
      }
    ]
  })
});

function App() {
  const { counter } = useValues(counterLogic);
  const { increment, decrement } = useActions(counterLogic);

  return (
    <div className="App">
      <div className="kea-counter">
        Count: {counter}
        <br />
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={() => decrement(1)}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
