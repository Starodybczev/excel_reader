import { useCallback, useState } from 'react'
import { useDataContext } from '../../context/DataContext'
import type { ColumnType } from '../../components/UsersList'
import { useCurrentTable } from '../hooks/useCurrentTable'

export function rememberAddColumn() {
    const [newColumn, setNewColumn] = useState("")
    const [type, setType] = useState<ColumnType>("text")
    const { setUsers, setNewRow } = useDataContext()
    const { currentTableId } = useCurrentTable()

const handleAddColumn = useCallback(() => {
    const name = newColumn.trim();
    if (!name || !currentTableId) return;

    setUsers((prev) =>
        prev.map((item) => {
            if (item.id !== currentTableId) return item;

            const hasColumn = item.columns.some((col) => col.name === name);
            if (hasColumn) return item;

            return {
                ...item,
                columns: [
                    ...item.columns,
                    { name, placeholder: name, type }
                ],
                rows: item.rows.map((row) => ({
                    ...row,
                    [name]: ""
                }))
            };
        })
    );

    setNewRow((prev) => ({
        ...prev,
        [name]: ""
    }));

    setNewColumn("");
}, [newColumn, type, currentTableId, setUsers, setNewRow]);

    const func = { handleAddColumn }
    const state = { newColumn, setNewColumn, type, setType }
    const props = { ...func, ...state }

    return { ...props }
}
