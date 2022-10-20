import React from 'react'
import './app.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Page1 from './page/Page1'
import HomePage from './page/HomePage/HomePage'
function App() {
  return (
    <Router>
      <section>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </section>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  )
}

export default App
