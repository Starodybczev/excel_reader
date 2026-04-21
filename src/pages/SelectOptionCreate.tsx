import { memo } from "react";
import CreateTable from "../components/CreateTable";

function SelectOptionCreate() {
  return (
    <div>
      <CreateTable />
    </div>
  );
}

export default memo(SelectOptionCreate);
