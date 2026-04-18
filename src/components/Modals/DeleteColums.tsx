import { memo } from "react";
import { useCurrentTable, useRememberDelColumn, Modal } from "../../utils";

interface PropsModal {
  isOpen: boolean;
  handleCloseModal: () => void;
}

function DeleteColums({ isOpen, handleCloseModal }: PropsModal) {
  const { selectedColumns, setSelectedColumns, handleDeleteColumns } =
    useRememberDelColumn();
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
      <div className="checkbox" key={name}>
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
      <div className="checkbox_block">{checkbox}</div>
      <button className="btn_add" onClick={handleDeleteColumns}>
        delete
      </button>
    </Modal>
  );
}
export default memo(DeleteColums);
