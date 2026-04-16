import { memo, useMemo } from 'react'
import type { AssetsType } from '../../components/FileReaderList'
import type { FieldType, filterProps } from '../../components/UsersList'
import { useDataContext } from '../../context/DataContext'
import InputTypeMap from './InputTypeMap'
import renderCell from '../func/renderCell'
import useTable from '../hooks/useTable'


type TableMapType = {
    search: string,
    columns: FieldType[]
    visibleColums: string[]
    filters: filterProps | null

}

function TableMap({ search, columns, visibleColums, filters }: TableMapType) {

    const {
        users,
        handleUPloadImages,
        editConfig,
    } = useDataContext()

    const { handleDelete, handleEdit } = useTable()

    const filtered = useMemo(() => {
        const query = search.toLowerCase();

        return users.map((item) => ({
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

    const { handlerenderCell } = renderCell()

    const hasError = filtered?.some((item: AssetsType) => item.rows.length > 0)


    const headerTable = columns
    .filter(({name}) => visibleColums.includes(name))
    .map(({ name, placeholder }) => {
        return (
            <th key={name}>{name || placeholder}</th>
        )
    })

    const fileColumn = columns.find(col => col.type === "file");

    const elem = search && !hasError ? (
        <p>not found</p>
    ) : (
        filtered?.map((file: AssetsType) => (
            <div key={file.id} style={{ marginBottom: '20px' }}>
                <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            {headerTable}
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {file.rows.map((row) => {
                            const { id } = row
                            return (
                                <tr key={id}>
                                    {columns.filter(({name}) => visibleColums.includes(name)).map((col) => (
                                        <td key={col.name}>
                                            {handlerenderCell({ col, row })}
                                        </td>
                                    ))}
                                    <td>
                                        <button onClick={() => handleEdit({ row: row, file: file })}>Edit</button>
                                        <button onClick={() => handleDelete(file.id, row.id!)}>delete</button>
                                        <button onClick={() => console.log(columns)}>check</button>
                                        {editConfig?.rowId === row.id &&
                                            editConfig?.fileId === file.id && (
                                                fileColumn &&
                                                <input type="file" onChange={(e) => handleUPloadImages(fileColumn!.name, e)} accept="image/png, image/jpeg" />
                                            )}
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <InputTypeMap visibleColums={visibleColums}/>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    );

    return (
        <>{elem}</>
    )
}
export default memo(TableMap)
