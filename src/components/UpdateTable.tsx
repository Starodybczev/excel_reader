import { memo } from "react";
import { useDataContext } from "../context/DataContext";
import useTable from "../utils/hooks/useTable";

interface Props {
  disabled: boolean;
}

function UpdateTable({ disabled }: Props) {
  const { newRow, editConfig, setNewRow } = useDataContext();
  const { handleUpdateTable, handleAdd } = useTable();

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
    <button disabled={disabled} onClick={CreateTask}>
      {editConfig ? "save change" : "add"}
    </button>
  );
}
export default memo(UpdateTable);
