import { memo } from "react";
import { useDataContext } from "../context/DataContext";
import UpdateTable from "./UpdateTable";
import { useCurrentTable } from "../utils";

function AddDataFromTable() {
  const { newRow, visibleColums } = useDataContext();
  const { currentTable } = useCurrentTable();

  const activeColumns = (currentTable?.columns || []).filter((col) =>
    visibleColums.includes(col.name),
  );

  const isDisable =
    activeColumns.length === 0 ||
    activeColumns.some((col) => {
      const val = newRow[col.name];

      if (typeof val === "string") return !val.trim();
      if (typeof val === "number") return false;
      return val === undefined || val === null;
    });

  return (
    <div>
      <UpdateTable disabled={isDisable} />
    </div>
  );
}
export default memo(AddDataFromTable);
