import { memo, useState, type Dispatch, type SetStateAction } from "react";
import type { AssetsType } from "../../../types";

interface FilterProps {
  currentTable: AssetsType | null;
  setVisibleColums: Dispatch<SetStateAction<string[]>>;
  handleCloseModal: () => void;
}
function FilterColums({
  currentTable,
  setVisibleColums,
  handleCloseModal,
}: FilterProps) {
  const [selectedColumn, setSelectedColumn] = useState("all");

  const [hiddenCols, setHiddenCols] = useState<string[]>([]);

  const allColumnNames = currentTable?.columns.map((c) => c.name) ?? [];
  const currentVisible = allColumnNames.filter(
    (name) => !hiddenCols.includes(name),
  );

  const handleSelectChange = (val: string) => {
    setSelectedColumn(val);
    if (!currentTable) return;

    if (val === "all") {
      setHiddenCols([]);
    } else {
      const others = allColumnNames.filter((name) => name !== val);
      setHiddenCols(others);
    }
  };

  const toggleColumn = (colName: string) => {
    setHiddenCols((prev) =>
      prev.includes(colName)
        ? prev.filter((c) => c !== colName)
        : [...prev, colName],
    );
  };

  const handleApplyFilter = () => {
    if (!currentTable) return;

    const result = allColumnNames.filter((name) => !hiddenCols.includes(name));

    setVisibleColums(result.length > 0 ? result : allColumnNames);
    handleCloseModal();
  };

  return (
    <div className="filter_block_madal">
      <h1>Filter Table</h1>

      <select
        className="select_table"
        value={selectedColumn}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option value="" disabled>
          select column
        </option>
        <option value="all">all</option>
        {currentTable?.columns.map(({ name, label }) => (
          <option key={name} value={name}>
            {label || name}
          </option>
        ))}
      </select>

      <div className="checkbox_block">
        {currentTable?.columns.map(({ name, label }) => (
          <div className="checkbox" key={name}>
            <span>{label || name}</span>
            <input
              type="checkbox"
              checked={!hiddenCols.includes(name)}
              onChange={() => toggleColumn(name)}
            />
          </div>
        ))}
      </div>

      <button
        disabled={currentVisible.length === 0}
        className="btn_add dis"
        onClick={handleApplyFilter}
      >
        apply
      </button>
    </div>
  );
}

export default memo(FilterColums);
