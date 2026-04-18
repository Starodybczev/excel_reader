import { lazy, memo, Suspense, useMemo } from "react";
import type { AssetsType } from "../../components/FileReaderList";
import type { filterProps } from "../../components/UsersList";
import { useDataContext } from "../../context/DataContext";
import useRenderCell from "../func/useRenderCell";
import useTable from "../hooks/useTable";

type TableMapType = {
  users: AssetsType[];
  search: string;
  visibleColums: string[];
  filters: filterProps | null;
};

const TableRow = lazy(() => import("./TableRow"));
const InputTypeMap = lazy(() => import("./InputTypeMap"));

function TableMap({ search, visibleColums, users, filters }: TableMapType) {
  const {
    handleUPloadImages,
    editConfig,
    newRow,
    handleChangeValue,
    isUpdate,
    fileRef,
  } = useDataContext();
  const { handleDelete, handleEdit } = useTable();
  const { handlerenderCell } = useRenderCell();

  const props = useMemo(
    () => ({
      handleUPloadImages,
      newRow,
      handleChangeValue,
      isUpdate,
      fileRef,
      visibleColums,
    }),
    [
      handleUPloadImages,
      newRow,
      handleChangeValue,
      isUpdate,
      fileRef,
      visibleColums,
    ],
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    return users
      .filter((el) => Array.isArray(el.rows))
      .map((item) => ({
        ...item,
        rows: item.rows.filter((row) => {
          const matchSearch = Object.values(row).some((value) =>
            value?.toString().toLowerCase().includes(query),
          );

          const matchFilter =
            !filters ||
            !filters.column ||
            !filters.value ||
            row[filters.column]
              ?.toString()
              .toLowerCase()
              .includes(filters.value.toLowerCase());

          return matchSearch && matchFilter;
        }),
      }));
  }, [search, users, filters]);

  const elem = useMemo(() => {
    const hasError = filtered.some((item: AssetsType) => item.rows.length > 0);

    if (search && !hasError) {
      return <p>not found</p>;
    }

    return filtered.map((file: AssetsType) => {
      const currentColumns = file.columns ?? [];
      const fileColumn = currentColumns.find((col) => col.type === "file");

      return (
        <div key={file.id} style={{ marginBottom: "20px" }}>
          <table
            border={1}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                {currentColumns
                  .filter(({ name }) => visibleColums.includes(name))
                  .map(({ name, label, placeholder }) => (
                    <th key={name}>{label || name || placeholder}</th>
                  ))}
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {file.rows.map((row) => {
                const isRowEditing =
                  editConfig?.rowId === row.id &&
                  editConfig?.fileId === file.id;

                const activity = {
                  row,
                  file,
                  visibleColums,
                  currentColumns,
                  handlerenderCell,
                  handleEdit,
                  handleDelete,
                  handleUPloadImages,
                  fileColumn,
                  isRowEditing,
                };

                return <TableRow key={row.id} {...activity} />;
              })}
              <tr>
                <InputTypeMap {...props} />
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }, [
    filtered,
    search,
    visibleColums,
    editConfig,
    props,
    handleEdit,
    handleDelete,
    handleUPloadImages,
    handlerenderCell,
  ]);

  return <Suspense fallback={<p>Загрузка таблицы...</p>}>{elem}</Suspense>;
}
export default memo(TableMap);
