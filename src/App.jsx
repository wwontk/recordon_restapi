import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GlobalStyle from "../GlobalStyle";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import useAuthStore from "./store/authStore";

function App() {
  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute authenticated={authenticated} component={Login} />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute authenticated={authenticated} component={Home} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
