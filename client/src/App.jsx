import { useState, useEffect } from 'react'
import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './styles/main.css'
import WelcomeBase from './componenets/WelcomeBase'
import StudentDash from './componenets/StudentDash.jsx';
import AdminDash from './componenets/AdminDash.jsx';


function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);


  return (
  <Routes>
    <Route path='/' element={<WelcomeBase/>} />
    <Route path='/student' element={<StudentDash/>} />
    <Route path='/admin' element={<AdminDash/>} />
  </Routes>
)
  
}

export default App

