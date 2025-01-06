import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/auth/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/auth/Profile";
import Cart from "./pages/auth/cart/Cart";
import AdminDashboard from "./views/admin/AdminDashboard";
import ProductView from "./pages/auth/ProductView";
import Landing from "./pages/Landing";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/*" element={<UserAuthRoutes />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const UserAuthRoutes = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductView />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};



export default App;
