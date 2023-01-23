import UserInfo from "../../UserInfo/UserInfo";

const HomeHeader = () => {
  return (
    <>
      <header className="homeheader">
        <div className="top">
          <h1 className="homeheader__title">Accueil</h1>
          <UserInfo />
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
