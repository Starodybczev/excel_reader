import { memo, useCallback, type MouseEvent } from "react";
import { defaultColumns, useDataContext } from "../context/DataContext";
import { useDropzone, type FileRejection } from "react-dropzone";
import { Link } from "react-router-dom";
import { useExcelReader } from "../utils";
import type { AssetsType, AssetRow } from "../types";
import { getRoute } from "../utils/const/getRoute";

function FileDropZone() {
  const { users, setUsers } = useDataContext();
  const { readExcel } = useExcelReader<AssetRow>();

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        alert("Некоторые файлы не являются Excel-таблицами");

        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((err) => {
            if (err.code === "file-invalid-type") {
              console.error(`Файл ${file.name} имеет неверный формат`);
            }
          });
        });
      }
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
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop,
    multiple: true,
  });

  const handleDelateFile = useCallback(
    (id: string, e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setUsers((prev) => prev.filter((el) => el.id !== id));
    },
    [setUsers],
  );

  const DropZone = users.map(({ id, name }) => {
    return (
      <div onClick={(e) => e.stopPropagation()} className="card_file" key={id}>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={getRoute.current_table(id)}
        >
          {name}
        </Link>
        <button onClick={(e) => handleDelateFile(id, e)}>x</button>
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

      <div className="cards_excel_files">{users.length > 0 && DropZone}</div>
    </div>
  );
}
export default memo(FileDropZone);
