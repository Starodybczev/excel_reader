import { memo, type ChangeEvent, type ReactNode } from "react";
import type { FieldType } from "../../pages/UsersList";
import type { AssetRow } from "../hooks";
import type { AssetsType } from "../../components/FileReaderList";

interface TableRowProps {
  row: AssetRow;
  file: AssetsType;
  currentColumns: FieldType[];
  visibleColums: string[];
  handlerenderCell: (args: { col: FieldType; row: AssetRow }) => ReactNode;
  handleEdit: (args: { row: AssetRow; file: AssetsType }) => void;
  handleDelete: (fileId: string, rowId: string) => void;
  handleUPloadImages: (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
  isRowEditing: boolean;
  fileColumn: FieldType | undefined;
}

const TableRow = memo(
  ({
    row,
    file,
    currentColumns,
    visibleColums,
    handlerenderCell,
    handleEdit,
    handleDelete,
    isRowEditing,
    fileColumn,
    handleUPloadImages,
  }: TableRowProps) => {
    return (
      <tr>
        {currentColumns
          .filter(({ name }) => visibleColums.includes(name))
          .map((col) => (
            <td key={col.name}>{handlerenderCell({ col, row })}</td>
          ))}
        <td>
          <button onClick={() => handleEdit({ row, file })}>Edit</button>
          <button onClick={() => handleDelete(file.id, row.id!)}>delete</button>
          {isRowEditing && fileColumn && (
            <input
              type="file"
              onChange={(e) => handleUPloadImages(fileColumn.name, e)}
            />
          )}
        </td>
      </tr>
    );
  },
);

export default TableRow;
