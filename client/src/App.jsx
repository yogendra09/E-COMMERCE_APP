
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import Cart from './pages/cart/Cart'

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
       <Route path="/auth/*" element={<UserAuthRoutes />} />
       
       
       <Route path="" element={<AdminRoutes />} >
       
       </Route>
    </Routes>
    <Footer/>
    </>
  )
}

const UserAuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route  element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        
        </Route>
      </Routes>
    </div>
  )
}

const AdminRoutes = ()=>{
  return (
    <div></div>
  )
}

export default App