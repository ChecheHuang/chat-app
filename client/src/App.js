import React from 'react'
import './app.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './page/HomePage/HomePage'
import Chat from './page/Chat/Chat'
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
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
