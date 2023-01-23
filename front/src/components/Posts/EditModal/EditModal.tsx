import Modal from "../../Layouts/Modal/Modal";
import PublishInput from "../PublishInput/PublishInput";

type Props = {
  content: string;
  id: number;
  close: () => void;
};

const EditModal = ({ content, id, close }: Props) => {
  return (
    <Modal>
      <PublishInput
        title="Modifier..."
        button="Appliquer"
        content={content}
        id={id}
        close={close}
      />
    </Modal>
  );
};

export default EditModal;
