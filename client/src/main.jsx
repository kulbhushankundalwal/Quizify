import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import FormProvider from "./context/FormProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FormProvider>
    <Router>
      <App />
    </Router>
  </FormProvider>,
);
