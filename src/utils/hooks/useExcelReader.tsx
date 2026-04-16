import { useState } from 'react';
import * as XLSX from 'xlsx';
import { transformRow } from '../func/transformRow';

export type AssetRow = {
  id?: string;

  name: string;
  images?: string;
  amount?: number;
  group?: string;
  course?: number;
  beginning?: string
  ending?: string;
  age?: number;

  [key: string]: any;
};


export function useExcelReader<T>() {
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
          const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });

          // Читаем первый лист
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Преобразуем в JSON
          const json = XLSX.utils.sheet_to_json<T>(worksheet, {
            raw: false,
            dateNF: 'dd-mm-yyyy',
            defval: ''
          });

          const dataTable = json.map((item: any) => {
            const transform = transformRow(item)
            return {
              ...transform, 
              beginning: transform.beginning?.toString().replace(/\//g, '-'),
              ending: transform.ending?.toString().replace(/\//g, '-')
            }
          })

          setData(dataTable as T[]);
          setLoading(false);
          resolve(dataTable as T[]);
        } catch (err) {
          const errMsg = 'Ошибка при чтении Excel файла';
          setError(errMsg);
          setLoading(false);
          reject(errMsg);
        }
      };

      reader.onerror = () => {
        setError('Ошибка FileReader');
        setLoading(false);
        reject();
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return { readExcel, data, loading, error };
}