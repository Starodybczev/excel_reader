import ExcelJS, { type CellValue } from "exceljs";
import { useCallback, useMemo } from "react";
import { saveAs } from "file-saver";
import { addImage } from "../index";
import type { AssetsType } from "../../components/FileReaderList";

interface CurrentTableProps {
  currentTable: AssetsType | null;
}

export function useDownload({ currentTable }: CurrentTableProps) {
  const ExportTOexcel = useCallback(async () => {
    if (!currentTable) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("TotalData");

    const currentColumns = currentTable.columns;

    worksheet.columns = currentColumns.map((col) => ({
      header: col.label || col.name,
      key: col.name,
    }));

    let rowIndex = 2;

    currentTable.rows.forEach((row) => {
      const rowData: Record<string, CellValue> = {};

      currentColumns.forEach((col) => {
        const value = row[col.name];

        if (col.type === "file") return;

        if (col.type === "number") {
          rowData[col.name] =
            value !== undefined && value !== "" ? Number(value) : null;
        } else if (col.type === "link") {
          rowData[col.name] = value
            ? { text: String(value), hyperlink: String(value) }
            : null;
        } else {
          rowData[col.name] = (value ?? null) as CellValue;
        }
      });

      worksheet.addRow(rowData);

      currentColumns.forEach((col, colIndex) => {
        const CellValue = row[col.name];
        if (col.type === "file" && CellValue) {
          addImage({
            workbook,
            worksheet,
            base64: String(CellValue),
            rowIndex,
            colIndex,
          });
        }
      });

      rowIndex++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${currentTable.name}.xlsx`);
  }, [currentTable]);

  return useMemo(() => ({ ExportTOexcel }), [ExportTOexcel]);
}
