import { lazy, memo, type Dispatch, type SetStateAction } from "react";
import { Modal } from "../../utils";
import type { AssetsType } from "../../types";

const FilterColums = lazy(() => import("./components/FilterColums"));
interface FilterProps {
  currentTable: AssetsType | null;
  setVisibleColums: Dispatch<SetStateAction<string[]>>;
  isOpen: boolean;
  handleCloseModal: () => void;
}

function FilterTable({
  currentTable,
  setVisibleColums,
  isOpen,
  handleCloseModal,
}: FilterProps) {
  const filterProps = { currentTable, setVisibleColums };
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <FilterColums
        handleCloseModal={handleCloseModal}
        key={currentTable?.id}
        {...filterProps}
      />
    </Modal>
  );
}
export default memo(FilterTable);
