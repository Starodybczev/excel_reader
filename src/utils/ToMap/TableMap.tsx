import { memo, useMemo } from 'react'
import type { AssetsType } from '../../components/FileReaderList'
import type { FieldType, filterProps } from '../../components/UsersList'
import { defaultColumns, useDataContext } from '../../context/DataContext'
import InputTypeMap from './InputTypeMap'
import renderCell from '../func/renderCell'
import useTable from '../hooks/useTable'


type TableMapType = {
    users: AssetsType[]
    search: string,
    visibleColums: string[]
    filters: filterProps | null

}   

function TableMap({ search, visibleColums, users, filters }: TableMapType) {
    const { handleUPloadImages, editConfig } = useDataContext();
    const { handleDelete, handleEdit } = useTable();
    const { handlerenderCell } = renderCell();

    const filtered = useMemo(() => {
        const query = search.toLowerCase();

        return users.filter((el) => Array.isArray(el.rows)).map((item) => ({
            ...item,
            rows: item.rows.filter((row) => {
                const matchSearch = Object.values(row).some((value) =>
                    value?.toString().toLowerCase().includes(query)
                );

                const matchFilter =
                    !filters ||
                    !filters.column ||
                    !filters.value ||
                    row[filters.column]
                        ?.toString()
                        .toLowerCase()
                        .includes(filters.value.toLowerCase());

                return matchSearch && matchFilter;
            }),
        }));
    }, [search, users, filters]);

    const hasError = filtered.some((item: AssetsType) => item.rows.length > 0);

    const elem = search && !hasError ? (
        <p>not found</p>
    ) : (
        filtered.map((file: AssetsType) => {    
            const currentColumns = file.columns ?? [];

            const headerTable = currentColumns
                .filter(({ name }) => visibleColums.includes(name))
                .map(({ name, label, placeholder }) => (
                    <th key={name}>{label || name || placeholder}</th>
                ));

            const fileColumn = currentColumns.find((col) => col.type === "file");

            return (
                <div key={file.id} style={{ marginBottom: '20px' }}>
                    <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                {headerTable}
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {file.rows.map((row) => (
                                <tr key={row.id}>
                                    {currentColumns
                                        .filter(({ name }) => visibleColums.includes(name))
                                        .map((col) => (
                                            <td key={col.name}>
                                                {handlerenderCell({ col, row })}
                                            </td>
                                        ))}

                                    <td>
                                        <button onClick={() => handleEdit({ row, file })}>Edit</button>
                                        <button onClick={() => handleDelete(file.id, row.id!)}>delete</button>

                                        {editConfig?.rowId === row.id &&
                                            editConfig?.fileId === file.id &&
                                            fileColumn && (
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleUPloadImages(fileColumn.name, e)}
                                                    accept="image/png, image/jpeg"
                                                />
                                            )}
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <InputTypeMap visibleColums={visibleColums} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        })
    );

    return <>{elem}</>;
}
export default memo(TableMap)
