import { Icon } from "@iconify/react";
import { logout, setProfilPicture } from "../../core/auth/auth";
import { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import imagesToCompressedBase64 from "../../core/utils/compressImage";
const UserInfo = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = () => {
    logout(() => {
      authCtx.setIsLogged(false);
      authCtx.setEmail("");
      authCtx.setId("");
      authCtx.setName("");
      authCtx.setToken("");
      navigate("/login");
    });
  };

  const onChangeProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files === null) return;
    if (e.target.files.length === 1) {
      const tempFile: string[] = await imagesToCompressedBase64(e.target.files);
      setProfilPicture(authCtx.email, tempFile[0], authCtx.token);
    }
  };
  return (
    <div className="userinfo--container">
      <input
        type="file"
        accept="image/*"
        id="file"
        onChange={onChangeProfilePicture}
      />
      <label htmlFor="file">
        <Icon icon="mdi:user-circle" />
      </label>
      <label>
        <Icon icon="ri:logout-circle-r-fill" onClick={onLogout} />
      </label>
    </div>
  );
};

export default UserInfo;
