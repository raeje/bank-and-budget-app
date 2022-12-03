import React from "react";
import "./App.css";
import { Dashboard } from "./pages";
import { getCurrentUser } from "./utils";

function App() {
  const currentUser = getCurrentUser();
  return; // currentUser ? <Dashboard /> : <Home />;
}

export default App;
