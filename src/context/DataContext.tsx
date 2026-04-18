import {
  createContext,
  useContext,
  type ChangeEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import type { AssetsType } from "../components/FileReaderList";
import type { FieldType } from "../pages/UsersList";
import type { AssetRow } from "../utils";

interface EditConfigType {
  fileId: string;
  rowId: string;
}

interface AssetsContextType {
  users: AssetsType[];
  setUsers: React.Dispatch<React.SetStateAction<AssetsType[]>>;
  newRow: AssetRow;
  isUpdate: boolean;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUPloadImages: (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
  fileRef: RefObject<HTMLInputElement | null>;
  handleReset: () => void;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setNewRow: Dispatch<SetStateAction<AssetRow>>;
  editConfig: EditConfigType | null;
  setEditConfig: Dispatch<SetStateAction<EditConfigType | null>>;
}

export const defaultColumns: FieldType[] = [
  { name: "name", placeholder: "add name", type: "text", label: "name" },
  { name: "age", placeholder: "add age", type: "text", label: "age" },
  { name: "images", type: "file", label: "images" },
  {
    name: "beginning",
    placeholder: "add data begin",
    type: "text",
    label: "beginning",
  },
  {
    name: "ending",
    placeholder: "add data ending",
    type: "text",
    label: "ending",
  },
  {
    name: "group",
    placeholder: "add name group",
    type: "text",
    label: "group",
  },
];

export const DataContext = createContext<AssetsContextType | undefined>(
  undefined,
);

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext must be used within DataProvider");
  return context;
}
