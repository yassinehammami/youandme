import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import the UserProvider
import Header from './scences/header'
import HomePage from './scences/home';
import ProductDetail from './scences/productdetail';
import ProductForm from './scences/product';
import Cart from './scences/cart';
import Commande from './scences/commande';
import Login from './scences/login';
import SignUp from './scences/signup';
import Confirmation from './scences/confirmation';
import CheckInformation from './scences/checkinformation';
// Import other components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <UserProvider>
       <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />
        <Route path="/checkinformation" element={<CheckInformation />} />
        {/* Define other routes */}
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;