import { memo, type Dispatch, type SetStateAction } from "react";
import type { ColumnType } from "../../components/UsersList";

const options = [
  { id: 1, name: "text" },
  { id: 2, name: "number" },
  { id: 3, name: "file" },
  { id: 4, name: "link" },
];

interface Props {
  type: string;
  setType: Dispatch<SetStateAction<ColumnType>>;
}

function OptionList({ type, setType }: Props) {
  const option = options.map(({ id, name }) => {
    return (
      <option key={id} value={name}>
        {name}
      </option>
    );
  });
  return (
    <select
      value={type}
      onChange={(e) => setType(e.target.value as ColumnType)}
    >
      {option}
    </select>
  );
}
export default memo(OptionList);
