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
import Settings from "./pages/Settings"
import Craftor from "./pages/Craftor"
import Profile from "./pages/Profile"
import Craftlist from "./pages/Craftlist"
import CraftMedia from "./pages/CraftMedia"

//Additional Pages
import ProjectDetails from "./pages/ProjectDetails"
import EditProjectPage from "./pages/EditProjectPage"

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
        <Route path='/settings' element={<Settings />} />
        <Route path='/craftor' element={<Craftor />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/projects/:id' element={<ProjectDetails/>} />
        <Route path='/craftlist' element={<Craftlist />} />
        <Route path='/craftmedia' element={<CraftMedia />} />
        <Route
  path="/craftor/projects/edit/:id"
  element={<EditProjectPage />}
/>
      </Routes>
      
      <CrafteriaFooter />
    </>
  )
}

export default App
