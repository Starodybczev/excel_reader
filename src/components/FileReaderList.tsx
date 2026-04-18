import { memo, useState, type ChangeEvent } from "react";
import { useExcelReader } from "../utils";
import type { FieldType, AssetRow } from "../types";
import { defaultColumns } from "../context/DataContext";

export type AssetsType = {
  id: string;
  name: string;
  columns: FieldType[];
  rows: AssetRow[];
};

export interface DataListProps {
  DataUsers: (assets: AssetsType[]) => void;
}

function FileReaderList({ DataUsers }: DataListProps) {
  const [assets, setAssets] = useState<AssetsType[]>([]);
  const { readExcel } = useExcelReader<AssetRow>();

  if (!assets) return <p>Loading...</p>;

  const handleCheckFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const excelData = await readExcel(file);
    const rowWithInd = excelData.map((row) => ({
      ...row,
      id: `row-${crypto.randomUUID()}`,
    }));
    const newAsset: AssetsType = {
      id: crypto.randomUUID(),
      name: file.name,
      columns: defaultColumns,
      rows: rowWithInd,
    };

    const updateAssets = [newAsset];
    setAssets(updateAssets);
    DataUsers(updateAssets);
  };

  return (
    <form>
      <input
        type="file"
        onChange={handleCheckFile}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </form>
  );
}
export default memo(FileReaderList);
