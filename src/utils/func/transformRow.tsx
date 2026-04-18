import { columnMap } from "../data";
import type { AssetRow } from "../../types";

const normalizeKey = (key: string) => {
  return key
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\(.*?\)/g, "")
    .trim();
};

export const transformRow = (row: Record<string, unknown>): AssetRow => {
  const result: AssetRow = {
    name: "",
    images: "no image",
  };

  for (const rawKey in row) {
    const normalized = normalizeKey(rawKey);
    let matchedKey: string | null = null;

    for (const targetKey in columnMap) {
      if (columnMap[targetKey as keyof typeof columnMap].includes(normalized)) {
        matchedKey = targetKey;
        break;
      }
    }

    const value = row[rawKey];
    const safeValue =
      typeof value === "string" || typeof value === "number"
        ? value
        : undefined;

    if (matchedKey) {
      result[matchedKey] = safeValue;
    } else {
      result[rawKey] = safeValue;
    }
  }

  return result;
};
