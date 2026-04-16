import rememberDelColumn from '../utils/func/rememberDelColumn'
import Modal from '../utils/const/Modal'
import { useDataContext } from '../context/DataContext';

interface PropsModal {
    isOpen: boolean;
    handleCloseModal: () => void;
}

export default function DeleteColums({isOpen, handleCloseModal}: PropsModal) {
    const {selectedColumns, setSelectedColumns, handleDeleteColumns} = rememberDelColumn()
    const {columns} = useDataContext()


    const handleChange = (name: string) => {
        setSelectedColumns((prev) => {
            return prev.includes(name) 
            ? prev.filter((el) => el !== name)
            : [...prev, name]
        })
    }
    const checkbox = columns.map(({name}) => {
        return(
            <div>
                {name}
                <input 
                    type='checkbox' 
                    checked={selectedColumns.includes(name)}
                    onChange={() => handleChange(name)}
                    />
            </div>
        )
    })
  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
        <h1>Delete Column</h1>
        {checkbox}
        <button onClick={handleDeleteColumns}>delete</button>
    </Modal>
  )
}
