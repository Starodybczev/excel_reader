import { useDataContext } from '../../context/DataContext'

interface InputMapProps{
    visibleColums: string[]
}
export default function InputTypeMap({visibleColums}: InputMapProps) {
    const { columns, newRow, handleChangeValue, isUpdate, fileRef, handleUPloadImages } = useDataContext()
    const firstFileColumn = columns.find(col => col.type === "file");
    const element = columns.filter(({name}) => visibleColums.includes(name)).map(({ type, name, placeholder }) => {
        if (type === "file") {
            return (
                <td>
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
                        placeholder={placeholder}
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
                        placeholder={placeholder}
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
                    placeholder={placeholder}
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
