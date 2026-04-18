import { memo, type FormEvent } from "react";
import { useRememberAddColumn } from "../utils/hooks/useRememberAddColumn";
import OptionList from "../utils/const/OptionList";

function CreateColumnForm() {
  const { newColumn, type, setType, setNewColumn, handleAddColumn } =
    useRememberAddColumn();

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddColumn();
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        value={newColumn}
        type="text"
        placeholder="add collumn"
        required
        onChange={(e) => setNewColumn(e.target.value)}
      />
      <OptionList type={type} setType={setType} />
      <button>add column</button>
    </form>
  );
}
export default memo(CreateColumnForm);
