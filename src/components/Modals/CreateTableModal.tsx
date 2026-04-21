import { useState, type FormEvent } from "react";
import { Modal, useTable } from "../../utils";

interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}
export default function CreateTableModal({
  isOpen,
  handleCloseModal,
}: ModalProps) {
  const [name, setName] = useState("");
  const { handleCreateTable } = useTable();

  const handleSubbmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
    handleCreateTable(name);
    handleCloseModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
        }}
        onSubmit={handleSubbmit}
      >
        <h1>Create Table</h1>
        <input
          value={name}
          type="text"
          placeholder="name table"
          onChange={(e) => setName(e.target.value)}
        />
        <button disabled={!name.trim()} className="btn_add">
          create
        </button>
      </form>
    </Modal>
  );
}
