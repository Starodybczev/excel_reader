import {
  lazy,
  memo,
  Suspense,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMoodal } from "../../utils/hooks/useMoodal";
import { useDataContext } from "../../context/DataContext";
import type { AssetsType } from "../FileReaderList";

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

        <div>
          {users.length > 0 && (
            <>
              <button onClick={createModal.handleOpenModal}>
                create column
              </button>
              <button onClick={deleteModal.handleOpenModal}>
                delete column
              </button>
              <button onClick={filterModal.handleOpenModal}>
                filter column
              </button>
              <button onClick={editColumn.handleOpenModal}>edit column</button>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
}
export default memo(Modals);
