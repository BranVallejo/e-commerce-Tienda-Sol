import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:idProducto" element={<ProductDetail />} />
        {/* <Route path="/productos" element={<ProductList />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div className="p-10 text-center text-2xl font-bold text-red-600 bg-white rounded-xl shadow-lg">404 - Página No Encontrada</div>} /> */}
      </Routes>
    </>

    
  );
}

export default App
