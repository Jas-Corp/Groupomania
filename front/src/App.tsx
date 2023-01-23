import SignInPage from "./pages/auth/SignIn/SignInPage";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthDecoration from "./components/Layouts/AuthDecoration/AuthDecoration";
import AuthRoutes from "./Routes/AuthRoutes";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Success from "./pages/success/Success";

function App() {
  return (
    <Routes>
      <Route path="auth" element={<AuthDecoration />}>
        <Route path="signin" element={<SignInPage />} />
        <Route index element={<Login />} />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route path="home" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Route>

      <Route path="success" element={<Success />} />
      <Route path="error" element={<SignInPage />} />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
