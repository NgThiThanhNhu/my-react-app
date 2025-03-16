import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookCategory from "./pages/bookCategory";



import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Trang chủ</h1>}/>
        <Route path="/book-category" element={<BookCategory/>}/>
 
        {/*Thêm các route khác nếu cấn*/ }
      </Routes>
    </Router>
  );
}

export default App;
