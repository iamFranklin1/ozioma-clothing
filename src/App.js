import React from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<ShopPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
