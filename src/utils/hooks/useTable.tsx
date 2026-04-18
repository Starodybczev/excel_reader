import { useCallback, useMemo } from "react";
import { useDataContext } from "../../context/DataContext";
import type { AssetRow } from "./useExcelReader";
import type { AssetsType } from "../../components/FileReaderList";
import { useCurrentTable } from "./useCurrentTable";

interface updateProps {
  newRow: AssetRow;
}
interface EditProps {
  row: AssetRow;
  file: AssetsType;
}

export default function useTable() {
  const { currentTableId } = useCurrentTable();
  const {
    handleReset,
    setUsers,
    setIsUpdate,
    editConfig,
    setNewRow,
    setEditConfig,
  } = useDataContext();

  const handleUpdateTable = useCallback(
    ({ newRow }: updateProps) => {
      if (!editConfig) return;
      setUsers((prev) =>
        prev.map((file) =>
          file.id === editConfig.fileId
            ? {
                ...file,
                rows: file.rows.map((row) =>
                  row.id === editConfig.rowId
                    ? { ...row, ...newRow, id: row.id }
                    : row,
                ),
              }
            : file,
        ),
      );
      handleReset();
      setIsUpdate(false);
      setEditConfig(null);
    },
    [editConfig, setUsers, handleReset, setIsUpdate, setEditConfig],
  );

  const handleAdd = useCallback(
    ({ newRow }: updateProps) => {
      if (!currentTableId) return;

      setUsers((prev) =>
        prev.map((file) =>
          file.id === currentTableId
            ? {
                ...file,
                rows: [...file.rows, { ...newRow, id: crypto.randomUUID() }],
              }
            : file,
        ),
      );

      handleReset();
      setIsUpdate(false);
    },
    [currentTableId, setUsers, handleReset, setIsUpdate],
  );

  const handleDelete = useCallback(
    (fileId: string, rowId: string) => {
      setUsers((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? {
                ...file,
                rows: file.rows.filter((el) => el.id !== rowId),
              }
            : file,
        ),
      );
    },
    [setUsers],
  );

  const handleEdit = useCallback(
    ({ row, file }: EditProps) => {
      setIsUpdate(true);
      setNewRow({ ...row });
      setEditConfig({ fileId: file.id, rowId: row.id! });
    },
    [setIsUpdate, setNewRow, setEditConfig],
  );

  return useMemo(
    () => ({ handleDelete, handleEdit, handleUpdateTable, handleAdd }),
    [handleDelete, handleEdit, handleUpdateTable, handleAdd],
  );
}
