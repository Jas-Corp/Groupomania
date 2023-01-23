import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const Modal = (props: PropsWithChildren) => {
  return (
    <>
      {createPortal(
        <div className="modalContainer">{props.children}</div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modal;
