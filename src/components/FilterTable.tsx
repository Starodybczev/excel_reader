import { memo, type Dispatch, type SetStateAction } from "react";
import Modal from "../utils/const/Modal";
import FilterColums from "./FilterColums";
import type { AssetsType } from "./FileReaderList";

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
      <FilterColums {...filterProps} />
    </Modal>
  );
}
export default memo(FilterTable);
