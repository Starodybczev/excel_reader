import { useCallback } from 'react'
import { useDataContext } from '../../context/DataContext'
import type { AssetRow } from './useExcelReader'
import type { AssetsType } from '../../components/FileReaderList'

interface updateProps {
    newRow: AssetRow
}
interface EditProps {
    row: AssetRow
    file: AssetsType
}

export default function useTable() {
    const {
        handleReset,
        setUsers,
        setIsUpdate,
        editConfig,
        setNewRow,
        setEditConfig,
    } = useDataContext()

    const handleUpdateTable = useCallback(({ newRow }: updateProps) => {
        if (!editConfig) return;
        setUsers((prev) =>
            prev.map((file) =>
                file.id === editConfig.fileId
                    ? {
                        ...file,
                        rows: file.rows.map((row) =>
                            row.id === editConfig.rowId
                                ? { ...row, ...newRow, id: row.id }
                                : row
                        )
                    }
                    : file
            )
        );
        handleReset()
        setIsUpdate(false)
        setEditConfig(null);

    }, [editConfig])


    const handleAdd = useCallback(({newRow}: updateProps) => {
        setUsers((prev) => {
            if (!prev[0]) return prev;
            return [
                {
                    ...prev[0],
                    rows: [
                        ...prev[0].rows,
                        { ...newRow, id: crypto.randomUUID() }
                    ]
                },
                ...prev.slice(1)
            ]
        })
        handleReset()
        setIsUpdate(false)
    }, [editConfig, setUsers, handleReset, setIsUpdate, setEditConfig])


    const handleDelete = useCallback((fileId: string, rowId: string) => {
        setUsers((prev) =>
            prev.map((file) =>
                file.id === fileId
                    ? {
                        ...file,
                        rows: file.rows.filter((el) => el.id !== rowId),
                    }
                    : file
            )
        );
    }, [setUsers])

    const handleEdit = useCallback(({ row, file }: EditProps) => {
        setIsUpdate(true);
        setNewRow({ ...row });
        setEditConfig({ fileId: file.id, rowId: row.id! });
    }, [setIsUpdate, setNewRow, setEditConfig])

    const props = { handleDelete, handleEdit, handleUpdateTable, handleAdd }

    return { ...props }
}
