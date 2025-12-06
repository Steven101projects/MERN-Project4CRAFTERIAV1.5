import { Routes, Route } from "react-router-dom"
import "./App.css"

// Header
import CrafteriaHeader from "./components/MainHeader"
import CrafteriaFooter from "./components/MainFooter"

// Pages
import Home from './pages/HomePage'
import AboutUs from './pages/About'
import Craftbook from './pages/CraftBook'
import LogIn from './pages/LogIn'
import Register from './pages/Register'

function App() {

  return (
    <>
      {/* Global Header */}
      <CrafteriaHeader />

      {/* Page Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/craftbook' element={<Craftbook />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      
      <CrafteriaFooter />
    </>
  )
}

export default App
