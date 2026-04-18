import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import type { AssetsType, AssetRow } from "../types";
import { useRememberSelectImage } from "../utils";
import { DataContext } from "./DataContext";

interface EditConfigType {
  fileId: string;
  rowId: string;
}

const RowData: AssetRow = {
  name: "",
  age: undefined,
  images: "",
  beginning: "",
  ending: "",
  group: "",
};

type Props = {
  children: ReactNode;
};

export function DataProvider({ children }: Props) {
  const [users, setUsers] = useState<AssetsType[]>([]);
  const [newRow, setNewRow] = useState<AssetRow>(RowData);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [editConfig, setEditConfig] = useState<EditConfigType | null>(null);

  const { handleUPloadImages, fileRef, handleReset } = useRememberSelectImage({
    setNewRow,
  });

  const handleChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      handleChangeValue,
      users,
      setUsers,
      newRow,
      isUpdate,
      setIsUpdate,
      handleReset,
      handleUPloadImages,
      fileRef,
      setNewRow,
      editConfig,
      setEditConfig,
    }),
    [
      handleChangeValue,
      users,
      newRow,
      isUpdate,
      handleReset,
      handleUPloadImages,
      fileRef,
      editConfig,
    ],
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
