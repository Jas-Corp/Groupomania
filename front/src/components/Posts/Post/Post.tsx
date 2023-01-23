import { Icon } from "@iconify/react";
import { useContext } from "react";
import { useState } from "react";
import { likePost } from "../../../core/posts/posts";
import AuthContext from "../../../contexts/auth-context";
import EditModal from "../EditModal/EditModal";
import ContextMenu from "./ContextMenu/ContextMenu";
import moment from "moment";

type Props = {
  username: String;
  post: {
    author: { email: string; profilPicture: string };
    images: string;
    id: number;
    content: string;
    createdAt: any;
    LikedUsers: { email: string }[];
  };
  reloadPost: () => void;
};

const Post = (props: Props) => {
  const authCtx = useContext(AuthContext);
  const hasLikedUser = !!props.post.LikedUsers.find(
    (user) => user.email === authCtx.email
  );

  const canEdit = authCtx.email === props.post.author.email || authCtx.isAdmin;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(hasLikedUser);
  const images = props.post.images ? JSON.parse(props.post.images) : [];

  const [imageSelected, setImageSelected] = useState(0);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const createdAt = new Date(props.post.createdAt);

  // CHANGE MOMENT LANGUAGE TO FR
  moment.updateLocale("fr", {
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      ss: "%d secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans",
    },
  });

  const setLiked = () => {
    likePost(props.post.id, authCtx.token, () => {
      if (isLiked) {
        props.post.LikedUsers = props.post.LikedUsers.filter(
          (user) => user.email !== authCtx.email
        );
        setIsLiked(false);
      } else {
        props.post.LikedUsers.push({ email: authCtx.email });
        setIsLiked(true);
      }
    });
  };

  return (
    <>
      {isEditModalOpen && (
        <EditModal
          id={props.post.id}
          content={props.post.content}
          close={() => {
            setIsEditModalOpen(false);
            props.reloadPost();
          }}
        />
      )}
      <article className="post">
        <div className="post__header">
          <div className="post__header__img">
            <img src={props.post.author.profilPicture} alt="" />
          </div>
          <div className="post__info">
            <h3>{props.username}</h3>
            <span>{moment(createdAt).fromNow()}</span>
          </div>

          {canEdit && (
            <>
              <span className="post__header__utils icon_orange link">
                <Icon
                  icon="akar-icons:more-vertical"
                  onClick={() => {
                    setDisplayContextMenu(true);
                  }}
                />
                {displayContextMenu && (
                  <ContextMenu
                    postId={props.post.id}
                    reloadPost={props.reloadPost}
                    onEdit={() => {
                      setDisplayContextMenu(false);
                      setIsEditModalOpen(true);
                    }}
                  />
                )}
              </span>
            </>
          )}
        </div>
        <div className="post__content">
          <p>{props.post.content}</p>

          {/* IMAGE */}
          {images.length !== 0 && (
            <div className="post__mainImage">
              <img
                src={images[imageSelected]}
                className="post__mainImage__image"
                alt="Main post"
              />
            </div>
          )}

          <div className="post__imageSelector">
            {images.length > 1 &&
              images.map((image: string, index: number) => (
                <div
                  className={`post__imageSelector__image-container ${
                    imageSelected === index && "post__imageSelector__selected"
                  }`}
                  key={index}
                >
                  <img
                    src={image}
                    onClick={() => {
                      setImageSelected(index);
                    }}
                    alt="A post"
                    className={`post__imageSelector__image`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div
          className={`post__likes ${isLiked ? "post__likes--liked" : ""}`}
          onClick={setLiked}
        >
          <p>
            {props.post.LikedUsers.length}
            <Icon icon="flat-color-icons:like" />
          </p>
        </div>
      </article>
    </>
  );
};

export default Post;
