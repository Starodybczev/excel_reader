import { useMemo } from "react";

const handleUpdateById = <T extends { id: string }>(
  arr: T[],
  id: string,
  callback: (item: T) => T,
): T[] => {
  return arr.map((item) => (item.id === id ? callback(item) : item));
};

export function useUpdateById() {
  return useMemo(() => ({ handleUpdateById }), []);
}
