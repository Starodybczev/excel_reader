import { createContext, useContext, useState, type ChangeEvent, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from "react";
import type { AssetsType } from "../components/FileReaderList";
import { rememberSelectImage, type AssetRow } from "../utils";
import type { FieldType } from "../components/UsersList";


interface EditConfigType {
    fileId: string,
    rowId: string
}   

interface AssetsContextType {
    users: AssetsType[];
    setUsers: React.Dispatch<React.SetStateAction<AssetsType[]>>;
    newRow: AssetRow;
    isUpdate: boolean;
    handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    handleUPloadImages: (fieldName: string, e: ChangeEvent<HTMLInputElement>) => void
    fileRef: RefObject<HTMLInputElement | null>
    handleReset: () => void
    setIsUpdate: Dispatch<SetStateAction<boolean>>;
    setNewRow: Dispatch<SetStateAction<AssetRow>>;
    editConfig: EditConfigType | null;
    setEditConfig: Dispatch<SetStateAction<EditConfigType | null>>;
}

type Props = {
    children: ReactNode
}


const RowData: AssetRow = {
    name: "",
    age: undefined,
    images: "",
    beginning: "",
    ending: "",
    group: "",


}


export const defaultColumns: FieldType[] = [
  { name: "name", placeholder: "add name", type: "text", label: "name" },
  { name: "age", placeholder: "add age", type: "text", label: "age" },
  { name: "images", type: "file", label: "images" },
  { name: "beginning", placeholder: "add data begin", type: "text", label: "beginning" },
  { name: "ending", placeholder: "add data ending", type: "text", label: "ending" },
  { name: "group", placeholder: "add name group", type: "text", label: "group" }
];

const DataContext = createContext<AssetsContextType | undefined>(undefined)

export function DataProvider({ children }: Props) {
    const [users, setUsers] = useState<AssetsType[]>([]);
    const [newRow, setNewRow] = useState<AssetRow>(RowData);
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [editConfig, setEditConfig] = useState<EditConfigType | null>(null);


    const { handleUPloadImages, fileRef, handleReset } = rememberSelectImage({ setNewRow })

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewRow((prev) => ({ ...prev, [name]: value }))
    }

    const dataProps = { handleChangeValue, users, setUsers, newRow, isUpdate, setIsUpdate, handleReset, handleUPloadImages, fileRef, setNewRow, editConfig, setEditConfig }

    return (
        <DataContext.Provider value={{ ...dataProps }}>
            {children}
        </DataContext.Provider>
    )

}


export function useDataContext() {
    const context = useContext(DataContext)
    if (!context) throw new Error("useDataContext must be used within DataProvider");
    return context
}
