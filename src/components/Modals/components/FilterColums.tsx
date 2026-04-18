import { memo, useState, type Dispatch, type SetStateAction } from "react";
import type { AssetsType } from "../../../types";

interface FilterProps {
  currentTable: AssetsType | null;
  setVisibleColums: Dispatch<SetStateAction<string[]>>;
}
function FilterColums({ currentTable, setVisibleColums }: FilterProps) {
  const [selectedColumn, setSelectedColumn] = useState("all");
  const [visibleCols, setVisibleCols] = useState(
    () => currentTable?.columns.map((c) => c.name) ?? [],
  );

  const [prevColumns, setPrevColumns] = useState(currentTable?.columns);

  if (currentTable?.columns !== prevColumns) {
    const allColNames = currentTable?.columns.map((c) => c.name) ?? [];
    setPrevColumns(currentTable?.columns);
    setVisibleCols(allColNames);
  }

  const toggleColumn = (colName: string) => {
    const updated = visibleCols.includes(colName)
      ? visibleCols.filter((c) => c !== colName)
      : [...visibleCols, colName];

    setVisibleCols(updated);
  };

  const handleApplyFilter = () => {
    if (!currentTable) return;

    if (selectedColumn === "all") {
      const allColNames = currentTable.columns.map((el) => el.name);

      setVisibleCols(allColNames);

      setVisibleColums(allColNames);
    } else {
      const singleCol = [selectedColumn];
      setVisibleColums(singleCol);
      setVisibleCols(singleCol);
    }
  };

  const options = currentTable?.columns.map(({ name, label }) => {
    return (
      <option key={name} value={name}>
        {label || name}
      </option>
    );
  });

  const checkbox = currentTable?.columns.map(({ name, label }) => {
    return (
      <div className="checkbox" key={name}>
        {label || name}
        <input
          type="checkbox"
          checked={visibleCols?.includes(name)}
          onChange={() => toggleColumn(name)}
        />
      </div>
    );
  });
  return (
    <div className="filter_block_madal">
      <h1>Filter Table</h1>
      <select
        className="select_table"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        <option value="all">all</option>
        {options}
      </select>

      <div className="checkbox_block">{checkbox}</div>
      <button className="btn_add" onClick={handleApplyFilter}>
        apply
      </button>
    </div>
  );
}

export default memo(FilterColums);
