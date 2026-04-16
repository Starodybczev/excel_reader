import Modal from '../utils/const/Modal'
import CreateColumnForm from './CreateColumnForm';

interface PropsModal {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export default function CreateColumn({isOpen, handleCloseModal}: PropsModal) {
    
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
        <h1>Create Column</h1>
        <CreateColumnForm/>
    </Modal>
  )
}
