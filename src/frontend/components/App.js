import React from "react";
import Navbar from "./Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Merge from "./Merge";
import Home from "./Home";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
      <div className="bg-black w-full min-h-screen min-w-fit">
        <div className="bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/framework" element={<Merge />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
  );
};

export default App;
