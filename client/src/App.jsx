
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/auth/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/auth/Profile'
import Cart from './pages/auth/cart/Cart'
import AdminDashboard from './layout/admin/AdminDashboard'
import ProductView from './pages/auth/ProductView'

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
       <Route path="/auth/*" element={<UserAuthRoutes />} />
       
       
       <Route path="/admin/*" element={<AdminRoutes />} >
       
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
          <Route path='/product/:id' element={<ProductView />} />
        </Route>
      </Routes>
    </div>
  )
}

const AdminRoutes = ()=>{
  return (
    <Routes>
      <Route path="" element={<AdminDashboard />} />

    </Routes>
  )
}

export default App