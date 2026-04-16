import type { FieldType } from '../../components/UsersList';
import type { AssetRow } from '../hooks';
interface Props{
    col: FieldType,
    row: AssetRow
}
export default function renderCell() {

    const handlerenderCell = ({col, row}: Props) => {
        const value = row[col.name];

        if (!value) return null;

        switch (col.type) {
            case "file":
                return <img style={{ width: 100 }} src={value} />;

            case "link":
                return (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                    </a>
                );

            default:
                return value;
        }
    };
    return {handlerenderCell}
}
