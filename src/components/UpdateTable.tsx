import { memo } from "react";
import { useDataContext } from "../context/DataContext";
import { useTable } from "../utils";

interface Props {
  disabled: boolean;
}

function UpdateTable({ disabled }: Props) {
  const { newRow, editConfig, setNewRow } = useDataContext();
  const { handleUpdateTable, handleAdd } = useTable();

  const isInvalid = !newRow.name || newRow.name.trim() === "";

  const CreateTask = () => {
    if (editConfig) {
      handleUpdateTable({ newRow: newRow });
    } else {
      handleAdd({ newRow: newRow });
    }
    setNewRow({
      name: "",
      age: undefined,
      images: "",
      beginning: "",
      ending: "",
      group: "",
    });
  };
  return (
    <button
      className="btn_add__update"
      disabled={disabled || isInvalid}
      onClick={CreateTask}
    >
      {editConfig ? "save change" : "add"}
    </button>
  );
}
export default memo(UpdateTable);
