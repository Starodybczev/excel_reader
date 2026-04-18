import { lazy, memo } from "react";
import Modal from "../../utils/const/Modal";

const CreateColumnForm = lazy(() => import("./components/CreateColumnForm"));

interface PropsModal {
  isOpen: boolean;
  handleCloseModal: () => void;
}

function CreateColumn({ isOpen, handleCloseModal }: PropsModal) {
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <h1>Create Column</h1>
      <CreateColumnForm />
    </Modal>
  );
}
export default memo(CreateColumn);
