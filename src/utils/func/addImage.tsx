import ExcelJS from "exceljs";

type Props = {
  workbook: ExcelJS.Workbook;
  worksheet: ExcelJS.Worksheet;
  base64?: string;
  rowIndex: number;
  colIndex: number
};

export function addImage({ workbook, worksheet, base64, colIndex, rowIndex }: Props) {
  if (!base64) return;

  let extension: "png" | "jpeg";

  if (base64.startsWith("data:image/png;base64,")) {
    extension = "png";
  } else if (
    base64.startsWith("data:image/jpeg;base64,") ||
    base64.startsWith("data:image/jpg;base64,")
  ) {
    extension = "jpeg";
  } else {
    console.log("unsupported image format", base64.slice(0, 40));
    return;
  }

  const imageId = workbook.addImage({
    base64,
    extension,
  });

  worksheet.getRow(rowIndex).height = 80;

  worksheet.addImage(imageId, {
    tl: { col: colIndex , row: rowIndex - 1 },
    ext: { width: 60, height: 60 },
  });
}