import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GlobalStyle from "../GlobalStyle";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import RecordOn from "./pages/RecordOn";

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
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/recordon" element={<RecordOn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
