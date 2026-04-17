import ExcelJS from "exceljs"
import { useCallback } from 'react';
import { saveAs } from "file-saver";
import { addImage } from "../index"
import type { AssetsType } from "../../components/FileReaderList";

interface CurrentTableProps {
    currentTable: AssetsType | null
}

export function useDownload({ currentTable }: CurrentTableProps) {
    const ExportTOexcel = useCallback(async () => {
        if (!currentTable) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("TotalData");

        const currentColumns = currentTable.columns;

        worksheet.columns = currentColumns.map(col => ({
            header: col.label || col.name,
            key: col.name,
        }));

        let rowIndex = 2;

        currentTable.rows.forEach(row => {
            const rowData: Record<string, any> = {};

            currentColumns.forEach((col) => {
                const value = row[col.name];

                if (col.type === "file") return;

                if (col.type === "number") {
                    rowData[col.name] = Number(value);
                } else if (col.type === "link") {
                    rowData[col.name] = value
                        ? { text: value, hyperlink: value }
                        : "";
                } else {
                    rowData[col.name] = value;
                }
            });

            worksheet.addRow(rowData);

            currentColumns.forEach((col, colIndex) => {
                if (col.type === "file" && row[col.name]) {
                    addImage({
                        workbook,
                        worksheet,
                        base64: row[col.name],
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

    return { ExportTOexcel };
}