import { useState } from "react";
import Modal from "../utils/const/Modal";
import { useCurrentTable } from "../utils/hooks/useCurrentTable";
import { useDataContext } from "../context/DataContext";

interface RemaneColumnProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}
export default function RenameColumn({
  isOpen,
  handleCloseModal,
}: RemaneColumnProps) {
  const { currentTable } = useCurrentTable();
  const { setUsers } = useDataContext();

  const [selectedColumn, setSelectedColumn] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const options = currentTable?.columns.map(({ name, label }) => {
    return (
      <option key={name} value={name}>
        {label || name}
      </option>
    );
  });

  const handleApply = () => {
    if (!currentTable || !selectedColumn || !newLabel.trim()) return;

    setUsers((prev) => {
      return prev.map((item) => {
        return item.id === currentTable.id
          ? {
              ...item,
              columns: item.columns.map((col) => {
                return col.name === selectedColumn
                  ? { ...col, label: newLabel.trim() }
                  : col;
              }),
            }
          : item;
      });
    });
    setSelectedColumn("");
    setNewLabel("");
    handleCloseModal();
  };
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <h1>Rename</h1>
      <div>
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="" disabled>
            Select column
          </option>
          {options}
        </select>
        <input
          type="text"
          placeholder="new name"
          onChange={(e) => setNewLabel(e.target.value)}
        />
      </div>
      <button onClick={handleApply}>apply</button>
    </Modal>
  );
}
