import { type Dispatch, type SetStateAction } from 'react'
import Modal from '../utils/const/Modal'
import type { FieldType } from './UsersList'
import FilterColums from './FilterColums'

interface FilterProps {
    columns: FieldType[]
    setVisibleColums: Dispatch<SetStateAction<string[]>>
    isOpen: boolean
    handleCloseModal: () => void
}

export default function FilterTable({ columns, setVisibleColums, isOpen, handleCloseModal }: FilterProps) {
    const filterProps = { columns, setVisibleColums }
    return (
        <Modal isOpen={isOpen} closeModal={handleCloseModal}>
            <FilterColums {...filterProps} />
        </Modal>
    )
}
