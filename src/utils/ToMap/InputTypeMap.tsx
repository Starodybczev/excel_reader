import { defaultColumns, useDataContext } from '../../context/DataContext'
import { useCurrentTable } from '../hooks/useCurrentTable';

interface InputMapProps {
    visibleColums: string[]
}
export default function InputTypeMap({ visibleColums }: InputMapProps) {
    const { newRow, handleChangeValue, isUpdate, fileRef, handleUPloadImages } = useDataContext()
    const { currentTable } = useCurrentTable()
    if (!currentTable) return
    const columns = currentTable.columns
    const firstFileColumn = columns.find(col => col.type === "file");
    const element = columns.filter(({ name }) => visibleColums.includes(name)).map(({ type, name, placeholder }) => {
        if (type === "file") {
            return (
                <td key={name}>
                    {type === "file" &&
                        !(isUpdate && name === firstFileColumn?.name) && (
                            <input
                                type="file"
                                ref={fileRef}
                                onChange={(e) => handleUPloadImages(name, e)}
                                accept="image/png, image/jpeg"
                            />
                        )}

                </td>
            )
        }
        if (type === "number") {
            return (
                <td key={name}>
                    <input
                        type='number'
                        name={name}
                        placeholder={`add ${name}`}
                        value={newRow[name] ?? ""}
                        onChange={handleChangeValue} />
                </td>
            )
        }
        if (type === "link") {
            return (
                <td key={name}>
                    <input
                        type='url'
                        name={name}
                        placeholder={`add ${name}`}
                        value={newRow[name] ?? ""}
                        onChange={handleChangeValue}
                    />
                </td>
            )
        }
        return (
            <td key={name}>
                <input
                    type='text'
                    placeholder={`add ${name}`}
                    name={name}
                    value={newRow[name] ?? ""}
                    onChange={handleChangeValue}
                />
            </td>
        )
    })
    return (
        <>{element}</>
    )
}
