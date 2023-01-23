import SuccessDecoration from "../../components/Layouts/SuccessDecoration/SuccessDecoration";
import Circle from "../../components/Themes/Circle/Circle";

const Success = () => {
  return (
    <>
      <main className="main">
        <SuccessDecoration />
        <Circle>
          <img
            className="big-logo"
            src={require("../../resources/images/logos/big-logo.png")}
            alt="squares"
          />
        </Circle>
      </main>
    </>
  );
};

export default Success;
