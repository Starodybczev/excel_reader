import { memo, useState, type Dispatch, type SetStateAction } from 'react'
import type { FieldType } from './UsersList'

interface FilterProps {
    columns: FieldType[]
    setVisibleColums: Dispatch<SetStateAction<string[]>>
}
function FilterColums({ columns, setVisibleColums }: FilterProps) {
    const [selectedColumn, setSelectedColumn] = useState("");
    const [visibleCols, setVisibleCols] = useState(columns.map(c => c.name));


    const toggleColumn = (colName: string) => {
        const updated = visibleCols.includes(colName)
            ? visibleCols.filter(c => c !== colName)
            : [...visibleCols, colName];

        setVisibleCols(updated);
        setVisibleColums(updated);
    };

    const handleApplyFilter = () => {
        if (selectedColumn === "all") {
            setVisibleColums(columns.map(c => c.name));
        } else {
            setVisibleColums([selectedColumn]);
        }
    };


    const options = columns.map(({ name }) => {
        return (
            <option key={name} value={name}>{name}</option>
        )
    })

    const checkbox = columns.map(({ name }) => {
        return (
            <div>
                {name}
                <input
                    key={name}
                    type='checkbox'
                    checked={visibleCols.includes(name)}
                    onChange={() => toggleColumn(name)}
                />
            </div>
        )
    })
    return (
        <div>
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
                <option value="all">all</option>
                {options}
            </select>

            <div>
                {checkbox}
            </div>
            <button onClick={handleApplyFilter}>apply</button>
        </div>
    )
}

export default memo(FilterColums)
