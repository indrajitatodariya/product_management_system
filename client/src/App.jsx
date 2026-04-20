import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={token ? <AdminPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/admin" : "/login"} />} />
    </Routes>
  );
}

export default App;
