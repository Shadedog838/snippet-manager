import React from "react";
import Router from "./Router";
import "./style/index.scss";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
