import {
  lazy,
  memo,
  Suspense,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMoodal } from "../../utils";
import { useDataContext } from "../../context/DataContext";
import type { AssetsType } from "../../types";

import Add from "../../assets/add.svg";
import Delete from "../../assets/bin.svg";
import Filter from "../../assets/filter.svg";
import Edit from "../../assets/write.svg";
import Create from "../../assets/tabs.svg";

const CreateColumn = lazy(() => import("./CreateColumn"));
const DeleteColums = lazy(() => import("./DeleteColums"));
const FilterTable = lazy(() => import("./FilterTable"));
const RenameColumn = lazy(() => import("./RenameColumn"));
const CreateTableModal = lazy(() => import("./CreateTableModal"));
const DeleteTable = lazy(() => import("./DeleteTable"));

interface FilterProps {
  currentTable: AssetsType | null;
  setVisibleColums: Dispatch<SetStateAction<string[]>>;
}

function Modals({ currentTable, setVisibleColums }: FilterProps) {
  const createModal = useMoodal();
  const deleteModal = useMoodal();
  const filterModal = useMoodal();
  const editColumn = useMoodal();
  const createTable = useMoodal();
  const deleteTable = useMoodal();

  const { users } = useDataContext();

  return (
    <Suspense fallback={"loading"}>
      <div>
        <CreateColumn
          isOpen={createModal.isOpen}
          handleCloseModal={createModal.handleCloseModal}
        />
        <DeleteColums
          isOpen={deleteModal.isOpen}
          handleCloseModal={deleteModal.handleCloseModal}
        />
        <FilterTable
          isOpen={filterModal.isOpen}
          handleCloseModal={filterModal.handleCloseModal}
          currentTable={currentTable}
          setVisibleColums={setVisibleColums}
        />
        <RenameColumn
          isOpen={editColumn.isOpen}
          handleCloseModal={editColumn.handleCloseModal}
        />
        <CreateTableModal
          isOpen={createTable.isOpen}
          handleCloseModal={createTable.handleCloseModal}
        />
        <DeleteTable
          isOpen={deleteTable.isOpen}
          handleCloseModal={deleteTable.handleCloseModal}
        />

        <div className="modal_block_contant">
          {users.length > 0 && (
            <>
              <button
                className="create_modal"
                onClick={createModal.handleOpenModal}
              >
                <img className="icon-white" src={Add} />
              </button>
              <button
                className="delete_modal"
                onClick={deleteModal.handleOpenModal}
              >
                <img className="icon-white" src={Delete} />
              </button>
              <button
                className="filter_modal"
                onClick={filterModal.handleOpenModal}
              >
                <img className="icon-white" src={Filter} />
              </button>
              <button
                className="edit_modal"
                onClick={editColumn.handleOpenModal}
              >
                <img className="icon-white" src={Edit} />
              </button>
              <button
                onClick={createTable.handleOpenModal}
                className="create_table_btn"
              >
                <img className="icon-white" src={Create} />
              </button>
              <button
                onClick={deleteTable.handleOpenModal}
                className="delete_modal"
              >
                <img className="icon-white" src={Delete} />
              </button>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
}
export default memo(Modals);
