import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { transformRow } from "../func/transformRow";

export type AssetRow = {
  id?: string;

  name: string;
  images?: string;
  amount?: number;
  group?: string;
  course?: number;
  beginning?: string;
  ending?: string;
  age?: number;

  [key: string]: string | number | undefined;
};

export function useExcelReader<T extends AssetRow>() {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const readExcel = (file: File): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const buffer = e.target?.result;
          const workbook = XLSX.read(buffer, {
            type: "array",
            cellDates: true,
          });

          // Читаем первый лист
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Преобразуем в JSON
          const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(
            worksheet,
            {
              raw: false,
              dateNF: "dd-mm-yyyy",
              defval: "",
            },
          );

          const dataTable: T[] = json.map((item): T => {
            const transform = transformRow(item) as T;
            return {
              ...transform,
              beginning: transform.beginning?.toString().replace(/\//g, "-"),
              ending: transform.ending?.toString().replace(/\//g, "-"),
            };
          });

          setData(dataTable as T[]);
          setLoading(false);
          resolve(dataTable as T[]);
        } catch (err) {
          console.log(err);
          const errMsg = "Ошибка при чтении Excel файла";
          setError(errMsg);
          setLoading(false);
          reject(errMsg);
        }
      };

      reader.onerror = () => {
        setError("Ошибка FileReader");
        setLoading(false);
        reject();
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return useMemo(
    () => ({ readExcel, data, loading, error }),
    [readExcel, data, loading, error],
  );
}
