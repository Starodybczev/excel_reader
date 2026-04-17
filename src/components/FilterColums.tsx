import { memo, useState, type Dispatch, type SetStateAction } from 'react'
import type { AssetsType } from './FileReaderList';

interface FilterProps {
    currentTable: AssetsType | null
    setVisibleColums: Dispatch<SetStateAction<string[]>>
}
function FilterColums({ currentTable, setVisibleColums }: FilterProps) {
    const [selectedColumn, setSelectedColumn] = useState("all");
    const [visibleCols, setVisibleCols] = useState(currentTable?.columns.map(c => c.name) ?? []);


    const toggleColumn = (colName: string) => {
        const updated = visibleCols.includes(colName)
            ? visibleCols.filter(c => c !== colName)
            : [...visibleCols, colName];

        setVisibleCols(updated);
        setVisibleColums(updated);
    };

    const handleApplyFilter = () => {
        if(!currentTable) return
        if (selectedColumn === "all") {
            const allColums = currentTable.columns.map((el) => el.name)
            setVisibleCols(allColums)
            setVisibleColums(allColums)
        } else {    
            setVisibleColums([selectedColumn]);
            setVisibleCols([selectedColumn])
        }
    };


    const options = currentTable?.columns.map(({ name }) => {
        return (
            <option key={name} value={name}>{name}</option>
        )
    })

    const checkbox = currentTable?.columns.map(({ name }) => {
        return (
            <div key={name}>
                {name}
                <input
                    type='checkbox'
                    checked={visibleCols?.includes(name)}
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
