import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Spawn from "./Spawn";
import "./index.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { CarritoContextProvider } from "./context/CarritoContext";
import { UserContextProvider } from "./context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "react-bootstrap-typeahead/css/Typeahead.css";
// import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <CarritoContextProvider>
        <Spawn />
      </CarritoContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
