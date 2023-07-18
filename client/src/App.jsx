import { useState, useEffect } from 'react'
import React from 'react';
import './styles/main.css'
import Landing from './componenets/landing.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (

    <Landing></Landing>


  )
}

export default App

