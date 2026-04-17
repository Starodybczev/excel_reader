import { type Dispatch, type SetStateAction } from 'react'
import { useMoodal } from '../utils/hooks/useMoodal'
import CreateColumn from './CreateColumn'
import DeleteColums from './DeleteColums'
import { useDataContext } from '../context/DataContext'
import type { FieldType } from './UsersList'
import FilterTable from './FilterTable'
import type { AssetsType } from './FileReaderList'
import RenameColumn from './RenameColumn'

interface FilterProps {
    currentTable: AssetsType | null
    setVisibleColums: Dispatch<SetStateAction<string[]>>
}

export default function Modals({currentTable, setVisibleColums}: FilterProps) {
    const createModal = useMoodal()
    const deleteModal = useMoodal()
    const filterModal = useMoodal()
    const editColumn = useMoodal()

    const {users} = useDataContext()

    const createModalProps = {
        isOpen: createModal.isOpen,
        handleCloseModal: createModal.handleCloseModal
    }

    const deleteModalProps = {
        isOpen: deleteModal.isOpen,
        handleCloseModal: deleteModal.handleCloseModal
    }

    const filterModalProps = {
        isOpen: filterModal.isOpen,
        handleCloseModal: filterModal.handleCloseModal
    }

    const editColumnProps = {
        isOpen: editColumn.isOpen,
        handleCloseModal: editColumn.handleCloseModal
    }

    const filterProps = { currentTable, setVisibleColums,  }

    return (
        <div>
            <CreateColumn {...createModalProps} />
            <DeleteColums {...deleteModalProps} />
            <FilterTable {...filterModalProps} {...filterProps} />
            <RenameColumn {...editColumnProps}/>
            <div>
                {users.length > 0 && <button onClick={createModal.handleOpenModal}>create column</button>}
                {users.length > 0 && <button onClick={deleteModal.handleOpenModal}>delete column</button>}
                {users.length > 0 && <button onClick={filterModal.handleOpenModal}>filter column</button>}
                {users.length > 0 && <button onClick={editColumn.handleOpenModal}>edit column</button>}
            </div>
        </div>
    )
}
