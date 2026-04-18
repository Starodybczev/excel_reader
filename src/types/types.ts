export type ColumnType = "text" | "number" | "file" | "link";

export type FieldType = {
  name: string;
  placeholder?: string;
  type: ColumnType;
  label?: string;
  element?: number;
};

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

export type AssetsType = {
  id: string;
  name: string;
  columns: FieldType[];
  rows: AssetRow[];
};