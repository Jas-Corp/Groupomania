import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const SuccessDecoration = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="success-deco">
        <img
          src={require("./../../../resources/images/logos/logo.png")}
          alt="Groupomania logo"
        />
        <div className="success-deco__text">
          <Icon icon="akar-icons:circle-check-fill" />
          <h1>Votre inscription a bien été validé.</h1>
        </div>
        <p>
          Vous allez être{" "}
          <span className="highlight link" onClick={() => navigate("/home")}>
            rediriger
          </span>{" "}
          vers l’acceuil...
        </p>
      </div>
      <Outlet />
    </>
  );
};

export default SuccessDecoration;
