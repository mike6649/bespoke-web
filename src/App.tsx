import React from 'react';
import './App.css';
import SideNav from './components/sidenav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Salespersons from './pages/Salespersons';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <Router>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/salespersons" element={<Salespersons/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/sales" element={<Sales/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
