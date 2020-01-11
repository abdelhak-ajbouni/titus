import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { resetContext, getContext } from "kea";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

resetContext({
  createStore: {},
  plugins: []
});

ReactDOM.render(
  <Provider store={getContext().store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
