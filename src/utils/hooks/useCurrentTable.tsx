import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import type { AssetsType } from "../../components/FileReaderList";
import { useMemo } from "react";

interface useCurrentTableProps {
  currentTable: AssetsType | null;
  currentTableId: string | null;
}

export function useCurrentTable(): useCurrentTableProps {
  const { users } = useDataContext();
  const { id } = useParams();

  const currentTable = useMemo(() => {
    if (!id) return null;
    return users.find((el) => el.id === id) ?? null;
  }, [users, id]);

  return useMemo(
    () => ({
      currentTable,
      currentTableId: id ?? null,
    }),
    [currentTable, id],
  );
}
