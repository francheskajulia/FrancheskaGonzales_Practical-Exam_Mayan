import { useState } from 'react'
import './App.css'
import Tasks from './pages/Tasks'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Tasks/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App
