import { type FormEvent } from 'react'
import { rememberAddColumn } from '../utils/func/rememberAddColumn'
import OptionList from '../utils/const/OptionList'

export default function CreateColumnForm() {
  const { newColumn, type, setType, setNewColumn, handleAddColumn } = rememberAddColumn()

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddColumn()
  }


  return (
    <form onSubmit={handleAdd}>
      <input value={newColumn} type='text' placeholder='add collumn' required onChange={(e) => setNewColumn(e.target.value)} />
      <OptionList type={type} setType={setType} />
      <button>add column</button>
    </form>
  )
}
