import { FormEvent, useContext, useState, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { createPost, editPost } from "../../../core/posts/posts";
import AuthContext from "../../../contexts/auth-context";
import Button from "../../Themes/handlers/Button/Button";
import imagesToCompressedBase64 from "../../../core/utils/compressImage";

type Props = {
  reloadPost?: () => void;
  title?: ReactNode;
  button?: string;
  content?: string;
  id?: number;
  close?: () => void;
};

const PublishInput = (props: Props) => {
  const [content, setContent] = useState(props.content ? props.content : "");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const authCtx = useContext(AuthContext);
  const defaultTitle = (
    <>
      Bonjour, <span className="highlight">{authCtx.name}</span> quoi de neuf ?
    </>
  );

  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (content.length < 5) {
      setError("Le texte doit comporter au moins 5 caractères.");
      return;
    }

    setContent("");
    if (props.content && props.id && props.close) {
      editPost(props.id, content, images, authCtx.token, () => {
        props.close && props.close();
      });
      return;
    }
    
    createPost(content, images, authCtx.token, (data: { message: string }) => {
      setError(data.message);
      setImages([]);
      if (props.reloadPost) props.reloadPost();
    });
  };

  const onImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files.length <= 4) {
      setError("");
      const tempFile: string[] = await imagesToCompressedBase64(e.target.files);
      setImages(tempFile);
    } else setError("Veillez à ce qu'il n'y ait pas plus de 4 images.");
  };

  return (
    <form className="publish" onSubmit={formHandler}>
      <div className="publish__content">
        <p className="publish__text">
          {props.title ? props.title : defaultTitle}
        </p>

        <div className="publish__header">
          <textarea
            className="publish__input"
            placeholder="Nouveau post..."
            value={content}
            required
            minLength={6}
            onChange={(e) => {
              setError("");
              setContent(e.target.value);
            }}
          />

          <div className="publish__icons">
            <p className="publish__error">{error}</p>

            <div className="publish__icons__file">
              <label htmlFor="postImage" className="link">
                <Icon
                  icon="bi:file-earmark-image"
                  className="publish__icons__file__icon"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="postImage"
                onChange={onImageSelected}
                multiple
              />
            </div>
          </div>
        </div>

        <div className="publish__footer">
          <div className="publish__images">
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                className="publish__images__image"
                alt="selected"
              />
            ))}
          </div>

          <Button className="publish__button">
            {props.button ? props.button : "Publier"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PublishInput;
