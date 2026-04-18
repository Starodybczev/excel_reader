import { memo } from "react";
import { useDataContext } from "../context/DataContext";
import UpdateTable from "./UpdateTable";

function AddDataFromTable() {
  const { newRow } = useDataContext();

  const isDisable = Object.values(newRow).some((val) => !val);

  return (
    <div>
      <UpdateTable disabled={isDisable} />
    </div>
  );
}
export default memo(AddDataFromTable);
