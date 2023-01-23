import { useContext } from "react";
import AuthContext from "../contexts/auth-context";
import getUsernameFromEmail from "../core/utils/getUsernameFromEmail";

const useAuth = () => {
  const authCtx = useContext(AuthContext);

  const setLogedUser = (data: {
    token: string;
    id: string;
    email: string;
    isAdmin: boolean;
  }) => {
    authCtx.setIsLogged(true);
    authCtx.setToken(data.token);
    authCtx.setId(data.id);
    authCtx.setName(getUsernameFromEmail(data.email));
    authCtx.setEmail(data.email);
    authCtx.setIsAdmin(data.isAdmin);
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", getUsernameFromEmail(data.email));
    localStorage.setItem("isAdmin", data.isAdmin.toString());
  };

  return { setLogedUser };
};

export default useAuth;
