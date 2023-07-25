import { useState, useEffect } from 'react'
import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './styles/main.css'
import WelcomeBase from './componenets/WelcomeBase'
import StudentDash from './componenets/StudentDash.jsx';
import AdminDash from './componenets/AdminDash.jsx';
import Login from './componenets/login.jsx';
import Registration from './componenets/Registration.jsx';
// import AddCourses from './componenets/Courses.jsx';


function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);


  return (
  <Routes>
    <Route unique path='/' element={<Login/>}/>
    <Route path='/welcome/:id' element={<WelcomeBase/>} />
    <Route path='/student' element={<StudentDash/>} />
    <Route path='/admin' element={<AdminDash/>} />
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/home' element={<WelcomeBase/>} />
    {/* <Route path='/courses' element={<Courses/>}/> */}

  </Routes>
)
  
}

export default App

