import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Shops from "./pages/Shops";
import SingleProduct from "./pages/SingleProduct";
import AdminHome from "./pages/admin/AdminHome";
import EditProduct from "./pages/admin/EditProduct";
import AddProduct from "./pages/admin/AddProduct";
import MaintainProducts from "./pages/admin/MaintainProducts";
import MaintainShops from "./pages/admin/MaintainShops";
// import { ContactUs } from './pages/ContactUs';
import ContactUs from './pages/ContactUs';
import MaintainCategories from './pages/admin/MaintainCategories';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <NavigationBar />
    
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="product/:id" element={ <SingleProduct /> } />
        <Route path="contact" element={ <ContactUs /> } />
        
        { authCtx.loggedIn === true && <>
          <Route path="login" element={ <Navigate to="/admin" />  } />
          <Route path="signup" element={ <Navigate to="/admin" />  } />
          <Route path="admin" element={ <AdminHome /> } />
          <Route path="admin/add-product" element={ <AddProduct /> } />
          <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
          <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
          <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
          <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
        </>}
        { authCtx.loggedIn === false &&
          <>
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
            <Route path="admin/*" element={ <Navigate to="/login" /> } />
          </>
         }
      </Routes>
    </div>
  );
}

export default App;
