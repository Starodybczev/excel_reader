import { useCallback, useState } from 'react'
import { useDataContext } from '../../context/DataContext'

export default function rememberDelColumn() {
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const { setColumns, setUsers } = useDataContext()

    const handleDeleteColumns = useCallback(() => {
        if (selectedColumns.length === 0) return;

        setColumns(prev => {
            if (selectedColumns.length === prev.length) {
                alert("Нельзя удалить все колонки");
                return prev;
            }
            return prev.filter(col => !selectedColumns.includes(col.name));
        });

        setUsers(prev =>
            prev.map(file => ({
                ...file,
                rows: file.rows.map(row => {
                    const newRow = { ...row };

                    selectedColumns.forEach(col => {
                        delete newRow[col];
                    });

                    return newRow;
                })
            }))
        );

        setSelectedColumns([]);
    }, [setColumns, setUsers, selectedColumns])

    return { handleDeleteColumns, selectedColumns, setSelectedColumns }
}
