import { Modal, useCurrentTable, useTable } from "../../utils";
import { useDataContext } from "../../context/DataContext";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}
export default function DeleteTable({ isOpen, handleCloseModal }: ModalProps) {
  const [selectedTable, setSelectedTable] = useState("");
  const { users } = useDataContext();
  const { currentTableId } = useCurrentTable();
  const { handleDelTable } = useTable();

  const options = users
    .filter(({ id }) => id !== currentTableId)
    .map(({ id, name }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });

  const handleSelectOption = (id: string) => {
    if (!id) return;
    handleDelTable(id);
    setSelectedTable("");
    handleCloseModal();
  };

  const disable = options.length === 0;

  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <h1>DeleteTable</h1>
      <select
        className="select_table"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option hidden>select table</option>
        {options}
      </select>
      <button
        className="btn_add"
        disabled={disable}
        onClick={() => handleSelectOption(selectedTable)}
      >
        delete
      </button>
    </Modal>
  );
}
