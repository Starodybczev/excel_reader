import { memo, useMemo, type ChangeEvent, type RefObject } from "react";
import { useCurrentTable } from "../hooks/useCurrentTable";
import type { AssetRow } from "../hooks";

interface InputMapProps {
  visibleColums: string[];
  newRow: AssetRow;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  isUpdate: boolean;
  fileRef: RefObject<HTMLInputElement | null>;
  handleUPloadImages: (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement, Element>,
  ) => void;
}
function InputTypeMap({
  visibleColums,
  newRow,
  handleChangeValue,
  handleUPloadImages,
  fileRef,
  isUpdate,
}: InputMapProps) {
  const { currentTable } = useCurrentTable();

  const columns = useMemo(
    () => currentTable?.columns || [],
    [currentTable?.columns],
  );

  const firstFileColumn = useMemo(
    () => columns.find((col) => col.type === "file"),
    [columns],
  );

  const element = useMemo(() => {
    if (!currentTable) return null;
    return columns
      .filter(({ name }) => visibleColums.includes(name))
      .map(({ type, name }) => {
        if (type === "file") {
          return (
            <td key={name}>
              {type === "file" &&
                !(isUpdate && name === firstFileColumn?.name) && (
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={(e) => handleUPloadImages(name, e)}
                    accept="image/png, image/jpeg"
                  />
                )}
            </td>
          );
        }
        if (type === "number") {
          return (
            <td key={name}>
              <input
                type="number"
                name={name}
                placeholder={`add ${name}`}
                value={newRow[name] ?? ""}
                onChange={handleChangeValue}
              />
            </td>
          );
        }
        if (type === "link") {
          return (
            <td key={name}>
              <input
                type="url"
                name={name}
                placeholder={`add ${name}`}
                value={newRow[name] ?? ""}
                onChange={handleChangeValue}
              />
            </td>
          );
        }
        return (
          <td key={name}>
            <input
              type="text"
              placeholder={`add ${name}`}
              name={name}
              value={newRow[name] ?? ""}
              onChange={handleChangeValue}
            />
          </td>
        );
      });
  }, [
    columns,
    currentTable,
    visibleColums,
    newRow,
    fileRef,
    isUpdate,
    firstFileColumn,
    handleUPloadImages,
    handleChangeValue,
  ]);
  if (!currentTable) return null;

  return <>{element}</>;
}
export default memo(InputTypeMap);
