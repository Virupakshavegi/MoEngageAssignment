import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useListsContext } from "./hooks/useListContext";

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  const { user } = useAuthContext();
  const { lists } = useListsContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/lists"
              element={user ? <Lists /> : <Navigate to="/lists" />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
