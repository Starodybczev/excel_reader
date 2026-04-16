export function updateById() {

    const handleUpdateById = <T extends { id: string }>(
        arr: T[],
        id: string,
        callback: (item: T) => T
    ): T[] => {
        return arr.map((item) => (item.id === id ? callback(item) : item));
    };

    const props = { handleUpdateById }

    return { ...props }
}
