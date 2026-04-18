import { memo, type FormEvent } from "react";
import { useRememberAddColumn, OptionList } from "../../../utils";

function CreateColumnForm() {
  const { newColumn, type, setType, setNewColumn, handleAddColumn } =
    useRememberAddColumn();

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddColumn();
  };

  return (
    <form className="formCreateColumn" onSubmit={handleAdd}>
      <div className="option_menu">
        <input
          value={newColumn}
          type="text"
          placeholder="add collumn"
          required
          onChange={(e) => setNewColumn(e.target.value)}
        />
        <OptionList type={type} setType={setType} />
      </div>
      <button className="btn_add">add column</button>
    </form>
  );
}
export default memo(CreateColumnForm);
