import { useCallback, useMemo } from "react";
import { defaultColumns, useDataContext } from "../../context/DataContext";
import type { AssetRow, AssetsType } from "../../types";
import { useCurrentTable } from "./useCurrentTable";
import { useNavigate } from "react-router-dom";

interface updateProps {
  newRow: AssetRow;
}
interface EditProps {
  row: AssetRow;
  file: AssetsType;
}

export function useTable() {
  const { currentTableId } = useCurrentTable();
  const navigate = useNavigate();
  const {
    handleReset,
    setUsers,
    users,
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

  const handleCancell = useCallback(() => {
    setEditConfig(null);
    setIsUpdate(false);
    setNewRow({
      name: "",
      age: undefined,
      images: "",
      beginning: "",
      ending: "",
      group: "",
    } as AssetRow);
    handleReset();
  }, [setEditConfig, setIsUpdate, setNewRow, handleReset]);

  const handleEdit = useCallback(
    ({ row, file }: EditProps) => {
      setIsUpdate(true);
      setNewRow({ ...row });
      setEditConfig({ fileId: file.id, rowId: row.id! });
    },
    [setIsUpdate, setNewRow, setEditConfig],
  );

  const handleCreateTable = useCallback(
    (tableName: string) => {
      if (!tableName.trim()) return;

      const isExist = users.some(
        (item) => item.name.toLowerCase() === tableName.toLowerCase(),
      );

      if (isExist) {
        alert("такая таблица уже есть");
        return;
      }

      const id = crypto.randomUUID();
      const columns = defaultColumns.map((item) => ({ ...item }));

      const newTable: AssetsType = {
        id,
        name: tableName,
        columns,
        rows: [],
      };

      setUsers((prev) => [...prev, newTable]);

      navigate(`/create/file/${id}`);
    },
    [setUsers, navigate, users],
  );

  const handleDelTable = useCallback(
    (TABLE_ID: string) => {
      setUsers((prev) => prev.filter((item) => item.id !== TABLE_ID));
    },
    [setUsers],
  );

  return useMemo(
    () => ({
      handleCancell,
      handleCreateTable,
      handleDelete,
      handleEdit,
      handleUpdateTable,
      handleAdd,
      handleDelTable,
    }),
    [
      handleDelete,
      handleEdit,
      handleCreateTable,
      handleUpdateTable,
      handleAdd,
      handleCancell,
      handleDelTable,
    ],
  );
}
