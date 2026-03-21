import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Shop from './pages/Shop'
import Designers from './pages/Designers'
import Favorites from './pages/Favorites';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/fav" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
