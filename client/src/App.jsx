import { useState, useEffect } from 'react'
import React from 'react';
import './styles/main.css'
import Base from './componenets/landing.jsx';
// import Header from './componenets/header.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Base></Base>
    // <Admin></Admin>

  )
}

export default App

