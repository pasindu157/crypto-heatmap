import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import './index.css'

const App = () => {
  return (
    <div className='app-background'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <ToastContainer
          autoClose={2000}
          closeOnClick
        />
      </Router>
    </div>
  )
}

export default App
