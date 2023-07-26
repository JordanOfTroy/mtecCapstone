import { useState, useEffect } from 'react'
import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './styles/main.css'
import Login from './componenets/login.jsx';
import MainRouting from './componenets/MainRouting';
// import AddCourses from './componenets/Courses.jsx';


function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);


  return (
  <Routes>
    <Route unique path='/' element={<Login/>}/>
    <Route path='*' element={<MainRouting/>} />
  </Routes>
)
  
}

export default App

