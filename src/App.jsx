import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import GlobalStyle from "../GlobalStyle";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import List from "./pages/RecordON/List";
import Register from "./pages/RecordON/Register";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        {/* PublicRoute */}
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>

        {/* PrivateRoute */}
        <Route path="/recordon" element={<PrivateRoute />}>
          <Route path="list" element={<List />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
