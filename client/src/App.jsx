import { useState, useEffect } from 'react'
import React from 'react';
import './styles/main.css'
// import Base from './componenets/Base.jsx';
// import WelcomeBase from './componenets/WelcomeBase'
import StudentDash from './componenets/StudentDash.jsx';
import AdminDash from './componenets/AdminDash.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    // <WelcomeBase/>
    // <Base/>
    // <StudentDash/>
    <AdminDash/>
  )
}

export default App

