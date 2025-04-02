import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookCategory from "./pages/bookCategory";
import LoginPage from "./pages/authentication/Login";
import './App.css';
import BookChapter from "./pages/bookChapter";






function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/book-category" element={<BookCategory/>}/>
        <Route path="/book-chapter" element={<BookChapter/>}/>
        {/*Thêm các route khác nếu cấn*/ }
      </Routes>
    </Router>
  );
}

export default App;
