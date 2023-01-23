import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/auth-context";

const AuthRoutes = () => {
  const authCtx = useContext(AuthContext);
  let isLogged = authCtx.isLogged;

  if (localStorage.getItem("token") && !isLogged) {
    authCtx.setIsLogged(true);
    authCtx.setToken(localStorage.getItem("token")!);
    authCtx.setId(localStorage.getItem("id")!);
    authCtx.setName(localStorage.getItem("name")!);
    authCtx.setEmail(localStorage.getItem("email")!);
    authCtx.setIsAdmin(localStorage.getItem("isAdmin") === "true");
    isLogged = true;
  }

  return (
    <>
      {isLogged && <Outlet />}
      {!isLogged && <Navigate to="/auth" replace />}
    </>
  );
};

export default AuthRoutes;
