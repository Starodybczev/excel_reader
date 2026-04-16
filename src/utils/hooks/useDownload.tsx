
import ExcelJS from "exceljs"
import { useDataContext } from '../../context/DataContext';
import { useCallback } from 'react';
import { saveAs } from "file-saver";
import { addImage } from "../index"

export function useDownload() {
    const { users, columns } = useDataContext()

    const ExportTOexcel = useCallback(async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("TotalData");

        worksheet.columns = columns.map(col => ({
            header: col.label || col.name,
            key: col.name,
        }));

        let rowIndex = 2;

        users.forEach(file => {
            file.rows.forEach(row => {

                const rowData: any = {};

                columns.forEach((col) => {
                    const value = row[col.name];

                    if (col.type === "file") return;

                    if (col.type === "number") {
                        rowData[col.name] = Number(value);
                    }
                    else if (col.type === "link") {
                        rowData[col.name] = value
                            ? { text: value, hyperlink: value }
                            : "";
                    }
                    else {
                        rowData[col.name] = value;
                    }
                });

                worksheet.addRow(rowData);

                columns.forEach((col, colIndex) => {
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
        });

        const buffer = await workbook.xlsx.writeBuffer();

        saveAs(new Blob([buffer]), "final_table.xlsx");
    }, [users, columns]);

    return { ExportTOexcel }
}
