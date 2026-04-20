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
import { useDownload, useCurrentTable } from "../utils";
import { useDataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const TableMap = lazy(() => import("../utils/ToMap/TableMap"));
const AddDataFromTable = lazy(() => import("../components/AddDataFromTable"));
const Modals = lazy(() => import("../components/Modals/Modals"));

export interface filterProps {
  column: string;
  value: string;
}

function UsersList() {
  const { users, setNewRow, visibleColums, setVisibleColums } =
    useDataContext();
  const { currentTable } = useCurrentTable();

  const [filters, setFilters] = useState<filterProps | null>(null);
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
  }, [currentTable?.columns, setVisibleColums]);

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
    <Suspense fallback={<Loader />}>
      <div className="table_block">
        <div className="container">
          <div className="input_block">
            {users.length > 0 && (
              <input
                className={"input__search"}
                type="text"
                placeholder="search columns"
                onChange={handleSearch}
              />
            )}
          </div>
          <div className="select_option">
            {users.length > 0 && (
              <select
                className="select_table"
                value={currentTable?.id ?? ""}
                onChange={handleChangeOption}
              >
                {options}
              </select>
            )}
            {users.length > 0 && <Modals {...filterProps} />}
          </div>
          <div className="table">
            <div className="table_wrapper">
              <TableMap
                users={currentTable ? [currentTable] : []}
                {...props}
                {...filterProps}
              />
            </div>
            <div
              className="button__block"
              style={{ display: "flex", gap: "10px" }}
            >
              {users.length > 0 && <AddDataFromTable />}
              {users.length > 0 && (
                <button className="downLoad_btn" onClick={ExportTOexcel}>
                  download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
export default memo(UsersList);
