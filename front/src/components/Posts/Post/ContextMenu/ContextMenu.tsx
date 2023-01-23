import { useContext } from "react";
import AuthContext from "../../../../contexts/auth-context";
import { deletePost, likePost } from "../../../../core/posts/posts";

type Props = {
  postId: number;
  reloadPost: () => void;
  onEdit: () => void;
};
const ContextMenu = (props: Props) => {
  const postId = props.postId;
  const authCtx = useContext(AuthContext);

  const onDelete = () => {
    deletePost(postId, authCtx.token, () => {
      props.reloadPost();
    });
  };

  const onEdit = () => {
    props.onEdit();
  };

  return (
    <div className="test">
      <button onClick={onEdit}>Modifier</button>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  );
};

export default ContextMenu;
