import { useCallback, useState } from 'react'
import { useDataContext } from '../../context/DataContext'
import type { ColumnType } from '../../components/UsersList'

export function rememberAddColumn() {
    const [newColumn, setNewColumn] = useState("")
    const [type, setType] = useState<ColumnType>("text")
    const { setUsers, setColumns, setNewRow } = useDataContext()

    const handleAddColumn = useCallback(() => {
        const name = newColumn.trim()
        if (!name) return

        setColumns((prev) => [...prev, { name, placeholder: name, type }]);
        setUsers((prev) => prev.map((item) => ({
            ...item,
            rows: item.rows.map((row) => ({
                ...row,
                [name]: ""
            }))
        })))
        setNewRow((prev) => ({
            ...prev,
            [name]: ""
        }))
        setNewColumn("")
    }, [setColumns, newColumn, setNewColumn, setUsers , type])

    const func = { handleAddColumn }
    const state = { newColumn, setNewColumn, type, setType }
    const props = { ...func, ...state }

    return { ...props }
}
