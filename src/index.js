import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history"; // Import createBrowserHistory
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import "./App.css";
import App from "./App";

// Create a history object
const history = createBrowserHistory();

// Use the history object in the Router
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
