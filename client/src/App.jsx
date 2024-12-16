
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    </Routes>
    <Footer/>
    </>
  )
}

const UserRoutes = () => {
  return (
    <div>

    </div>
  )
}

const AdminRoutes = ()=>{
  return (
    <div></div>
  )
}

export default App