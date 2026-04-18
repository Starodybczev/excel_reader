import { memo, useCallback } from "react";
import { defaultColumns, useDataContext } from "../context/DataContext";
import { useDropzone } from "react-dropzone";
import type { AssetsType } from "./FileReaderList";
import { Link } from "react-router-dom";
import { useExcelReader, type AssetRow } from "../utils";

function FileDropZone() {
  const { users, setUsers } = useDataContext();
  const { readExcel } = useExcelReader<AssetRow>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        try {
          const rows = await readExcel(file);

          const newFile: AssetsType = {
            id: crypto.randomUUID(),
            name: file.name,
            columns: [...defaultColumns],
            rows: rows.map((row) => ({
              id: crypto.randomUUID(),
              ...row,
            })),
          };

          setUsers((prev) => [...prev, newFile]);
        } catch (error) {
          console.error("Ошибка чтения файла:", error);
        }
      }
    },
    [readExcel, setUsers],
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const DropZone = users.map(({ id, name }) => {
    return (
      <div key={id}>
        <Link onClick={(e) => e.stopPropagation()} to={`/file/${id}`}>
          {name}
        </Link>
      </div>
    );
  });
  return (
    <div
      {...getRootProps()}
      className="dropZone"
      style={{
        border: "2px dashed #999",
        padding: "24px",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпускай файлы сюда</p>
      ) : (
        <p>Перетащи файлы сюда или нажми для выбора</p>
      )}

      {users.length > 0 && DropZone}
    </div>
  );
}
export default memo(FileDropZone);
