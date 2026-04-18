import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { useDownload } from "../utils";
import { useDataContext } from "../context/DataContext";
import { useCurrentTable } from "../utils/hooks/useCurrentTable";
import { useNavigate } from "react-router-dom";

const TableMap = lazy(() => import("../utils/ToMap/TableMap"));
const AddDataFromTable = lazy(() => import("../components/AddDataFromTable"));
const Modals = lazy(() => import("../components/Modals/Modals"));

export type ColumnType = "text" | "number" | "file" | "link";

export type FieldType = {
  name: string;
  placeholder?: string;
  type: ColumnType;
  label?: string;
  element?: number;
};

export interface filterProps {
  column: string;
  value: string;
}

function UsersList() {
  const { users, setNewRow } = useDataContext();
  const { currentTable } = useCurrentTable();

  const [filters, setFilters] = useState<filterProps | null>(null);
  const [visibleColums, setVisibleColums] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  const { ExportTOexcel } = useDownload({ currentTable });

  useEffect(() => {
    if (users.length === 0 && !currentTable) {
      navigate("/");
    }
  }, [navigate, currentTable, users]);

  const options = users.map(({ name, id }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });

  const handleChangeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const tableID = e.target.value;
    if (!tableID) return;
    navigate(`/file/${tableID}`);
  };

  useEffect(() => {
    if (!currentTable?.columns) return;

    const nextVisible = currentTable.columns.map((col) => col.name);

    const timeoutId = setTimeout(() => {
      setVisibleColums((prev) => {
        const isSame =
          prev.length === nextVisible.length &&
          prev.every((item, index) => item === nextVisible[index]);

        return isSame ? prev : nextVisible;
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentTable?.columns]);

  const resetData = useCallback(() => {
    setNewRow({
      name: "",
      age: undefined,
      beginning: "",
      ending: "",
      group: "",
    });
  }, [setNewRow]);

  const props = useMemo(
    () => ({ search, currentTable, resetData }),
    [search, currentTable, resetData],
  );

  const filterProps = useMemo(
    () => ({
      filters,
      visibleColums,
      setFilters,
      setVisibleColums,
      search,
      resetData,
      currentTable,
    }),
    [
      filters,
      visibleColums,
      setFilters,
      setVisibleColums,
      currentTable,
      search,
      resetData,
    ],
  );

  return (
    <div>
      <Suspense fallback={"louding"}>
        <div>
          {users.length > 0 && <input type="text" onChange={handleSearch} />}
          {users.length > 0 && <Modals {...filterProps} />}
          {users.length > 0 && (
            <select
              value={currentTable?.id ?? ""}
              onChange={handleChangeOption}
            >
              {options}
            </select>
          )}
        </div>
        <TableMap
          users={currentTable ? [currentTable] : []}
          {...props}
          {...filterProps}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          {users.length > 0 && <AddDataFromTable />}
          {users.length > 0 && (
            <button onClick={ExportTOexcel}>download</button>
          )}
        </div>
      </Suspense>
    </div>
  );
}
export default memo(UsersList);
