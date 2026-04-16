import { columnMap } from "../data";
import type { AssetRow } from "../hooks";

export const transformRow = (row: Record<string, any>): AssetRow => {
    const result: AssetRow = {
        name: "",
    };

    const normalizeKey = (key: string) => {
        return key
            .toLowerCase()
            .replace(/[_-]/g, " ")  
            .replace(/\(.*?\)/g, "")  
            .trim();
    };

    for (const key in row) {
        const normalized = normalizeKey(key);

        let matchedKey: string | null = null;

        for (const target in columnMap) {
            const key = target as keyof typeof columnMap
            if (columnMap[key].includes(normalized)) {
                matchedKey = target;
                break;
            }
        }

        const value = row[key];

        if(!result.images){
            result.images = "no image"
        }

        if (matchedKey) {
            result[matchedKey] = value;
        } else {
            result[key] = value;
        }
    }

    return result;
};