import React from 'react'
import { useParams } from 'react-router-dom'
import { useDataContext } from '../../context/DataContext'

export function useCurrentTable() {
    const {users} = useDataContext()
    const { id } = useParams()
    const currentTable = id ? users.find((el) => el.id === id) ?? null : null

    const currentTableId = {currentTableId: id ?? null}
    const currentTableProps = {currentTable}
    const props = {...currentTableProps, ...currentTableId} 
    return { ...props }
}
