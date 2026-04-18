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

const CreateColumn = lazy(() => import("./CreateColumn"));
const DeleteColums = lazy(() => import("./DeleteColums"));
const FilterTable = lazy(() => import("./FilterTable"));
const RenameColumn = lazy(() => import("./RenameColumn"));

interface FilterProps {
  currentTable: AssetsType | null;
  setVisibleColums: Dispatch<SetStateAction<string[]>>;
}

function Modals({ currentTable, setVisibleColums }: FilterProps) {
  const createModal = useMoodal();
  const deleteModal = useMoodal();
  const filterModal = useMoodal();
  const editColumn = useMoodal();
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
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
}
export default memo(Modals);
