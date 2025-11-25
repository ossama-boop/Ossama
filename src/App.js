import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import About from "./components/About";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import LebanonGuide from "./components/LebanonGuide";
import ParentForm from "./components/ParentForm";
import StarRating from "./components/LebanonGuide";
function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/w" element={<Welcome />} />
          <Route path="/x" element={<About />} />
          <Route path="/y" element={<Contact />} />
          <Route path="/z" element={<Login />} />
          <Route path="/b" element={<LebanonGuide />} />
        </Routes>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;