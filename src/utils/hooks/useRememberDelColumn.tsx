import { useCallback, useMemo, useState } from "react";
import { useDataContext } from "../../context/DataContext";
import { useCurrentTable } from "./useCurrentTable";

export default function useRememberDelColumn() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { setUsers } = useDataContext();
  const { currentTableId } = useCurrentTable();

  const handleDeleteColumns = useCallback(() => {
    if (!currentTableId || selectedColumns.length === 0) return;

    setUsers((prev) =>
      prev.map((file) => {
        if (file.id !== currentTableId) return file;

        if (selectedColumns.length === file.columns.length) {
          alert("Нельзя удалить все колонки");
          return file;
        }

        return {
          ...file,
          columns: file.columns.filter(
            (col) => !selectedColumns.includes(col.name),
          ),
          rows: file.rows.map((row) => {
            const newRow = { ...row };

            selectedColumns.forEach((col) => {
              delete newRow[col];
            });

            return newRow;
          }),
        };
      }),
    );

    setSelectedColumns([]);
  }, [currentTableId, selectedColumns, setUsers]);

  return useMemo(
    () => ({
      handleDeleteColumns,
      selectedColumns,
      setSelectedColumns,
    }),
    [handleDeleteColumns, selectedColumns, setSelectedColumns],
  );
}
