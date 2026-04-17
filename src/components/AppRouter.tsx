import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FileDropZone from './FileDropZone'
import UsersList from './UsersList'

export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<FileDropZone/>}/>
        <Route path='/file/:id' element={<UsersList/>}/>
    </Routes>
  )
}
