import React from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Allbook from './pages/Allbook'
import View from './components/viewbookdetails/Viewbookdetails'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



const App = () => {
  return (
    <div>
     <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allbook' element={<Allbook />} />
          <Route path='/book/:id' element={<View />} />
          
          {/* Add more routes as needed */}
        </Routes>
        
        <Footer />
      </Router>
     
    
    </div>
  )
}

export default App
