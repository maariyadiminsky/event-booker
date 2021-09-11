import React from "react";
import { AuthContextProvider } from "../context/AuthContext";

import Routes from "./Routes";
import NavBar from "../components/NavBar/NavBar";

const App = () => {
  return (
      <div className="bg-gray-100 min-h-screen">
          <AuthContextProvider>
            <NavBar />
            <Routes />
          </AuthContextProvider>
      </div>
  );
}

export default App;
