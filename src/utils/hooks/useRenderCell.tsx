import { useCallback, useMemo } from "react";
import type { FieldType, AssetRow } from "../../types";
interface Props {
  col: FieldType;
  row: AssetRow;
}
export function useRenderCell() {
  const handlerenderCell = useCallback(({ col, row }: Props) => {
    const value = row[col.name];

    if (!value) return null;

    switch (col.type) {
      case "file":
        return (
          <img style={{ width: 100 }} src={String(value)} alt={col.name} />
        );

      case "link":
        return (
          <a href={String(value)} target="_blank" rel="noopener noreferrer">
            {String(value)}
          </a>
        );

      default:
        return value;
    }
  }, []);
  return useMemo(() => ({ handlerenderCell }), [handlerenderCell]);
}
