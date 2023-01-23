import { PropsWithChildren, useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  isLogged: false,
  token: "",
  name: "",
  id: "",
  email: "",
  isAdmin: false,
  setIsLogged: (loged: boolean) => {},
  setToken: (token: string) => {},
  setId: (id: string) => {},
  setName: (name: string) => {},
  setEmail: (email: string) => {},
  setIsAdmin: (isAdmin: boolean) => {},
});
export default AuthContext;

export const AuthProvider = (props: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        setToken,
        name,
        setName,
        id,
        setId,
        email,
        setEmail,
        isAdmin,
        setIsAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
