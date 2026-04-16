import { memo, useCallback, useState, type ChangeEvent } from 'react'
import FileReaderList from './FileReaderList'
import AddDataFromTable from './AddDataFromTable'
import { TableMap, useDownload } from '../utils'
import { useDataContext } from '../context/DataContext'
import Modals from './Modals'

export type ColumnType = "text" | "number" | "file" | "link";

export type FieldType = {
    name: string;
    placeholder?: string;
    type: ColumnType;
    label?: string;
    element?: number
}

export interface filterProps {
    column: string;
    value: string
}

function UsersList() {
    const { users, setUsers, setNewRow, columns } = useDataContext()

    const [filters, setFilters] = useState<filterProps | null>(null)
    const [visibleColums, setVisibleColums] = useState<string[]>(columns.map((item) => item.name))
    const [search, setSearch] = useState("")
    const { ExportTOexcel } = useDownload()


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const resetData = useCallback(() => {
        setNewRow({
            name: "",
            age: undefined,
            beginning: "",
            ending: "",
            group: ""
        })
    }, [setNewRow])

    const props = { search, columns, resetData }

    const filterProps = { columns, filters, visibleColums, setFilters, setVisibleColums }

    return (
        <div>
            <FileReaderList DataUsers={setUsers} />
                {users.length > 0 && <Modals {...filterProps}/>}
            <div>
                {users.length > 0 && <input type='text' onChange={handleSearch} />}
            </div>
            <TableMap {...props}{...filterProps} />
            <div style={{ display: "flex", gap: "10px" }}>
                {users.length > 0 && <AddDataFromTable />}
                {users.length > 0 && <button onClick={ExportTOexcel}>download</button>}
            </div>
        </div>
    )
}
export default memo(UsersList)
