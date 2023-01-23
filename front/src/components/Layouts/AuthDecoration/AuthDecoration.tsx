import { Outlet } from "react-router-dom";

const FormDecoration = () => {
  return (
    <>
      <div className="form-deco">
        <img
          src={require("./../../../resources/images/logos/logo.png")}
          alt="Groupomania logo"
        />
        <h1>
          <span className="highlight">Développer</span> votre réseau dans
          l’entreprise.
        </h1>
      </div>
      <Outlet />
    </>
  );
};

export default FormDecoration;
