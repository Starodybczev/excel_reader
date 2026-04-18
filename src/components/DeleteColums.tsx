import rememberDelColumn from "../utils/hooks/useRememberDelColumn";
import Modal from "../utils/const/Modal";
import { useCurrentTable } from "../utils/hooks/useCurrentTable";
import { memo } from "react";

interface PropsModal {
  isOpen: boolean;
  handleCloseModal: () => void;
}

function DeleteColums({ isOpen, handleCloseModal }: PropsModal) {
  const { selectedColumns, setSelectedColumns, handleDeleteColumns } =
    rememberDelColumn();
  const { currentTable } = useCurrentTable();

  const handleChange = (name: string) => {
    setSelectedColumns((prev) => {
      return prev.includes(name)
        ? prev.filter((el) => el !== name)
        : [...prev, name];
    });
  };
  const checkbox = currentTable?.columns.map(({ name, label }) => {
    return (
      <div key={name}>
        {label || name}
        <input
          type="checkbox"
          checked={selectedColumns.includes(name)}
          onChange={() => handleChange(name)}
        />
      </div>
    );
  });
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <h1>Delete Column</h1>
      {checkbox}
      <button onClick={handleDeleteColumns}>delete</button>
    </Modal>
  );
}
export default memo(DeleteColums);
