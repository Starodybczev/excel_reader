import { memo } from "react";
import { useDataContext } from "../context/DataContext";
import { useCurrentTable, useTable } from "../utils";
import type { AssetRow } from "../types";

interface Props {
  disabled: boolean;
}

function UpdateTable({ disabled }: Props) {
  const { newRow, editConfig, setNewRow } = useDataContext();
  const { handleUpdateTable, handleAdd } = useTable();
  const { currentTable } = useCurrentTable();

  const CreateTask = () => {
    if (editConfig) {
      handleUpdateTable({ newRow: newRow });
    } else {
      handleAdd({ newRow: newRow });
    }
    const emptyRow =
      currentTable?.columns.reduce((acc, col) => {
        acc[col.name] = "";
        return acc;
      }, {} as AssetRow) ?? ({} as AssetRow);

    setNewRow(emptyRow);
  };
  return (
    <button
      className="btn_add__update"
      disabled={disabled}
      onClick={CreateTask}
    >
      {editConfig ? "save change" : "add"}
    </button>
  );
}
export default memo(UpdateTable);
