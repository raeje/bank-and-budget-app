import "./App.css";
import { getCurrentUser } from "./utils";


function App() {
  const currentUser = getCurrentUser();
  return; // currentUser ? <Dashboard /> : <Home />;
}

export default App;
