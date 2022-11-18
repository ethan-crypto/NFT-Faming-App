import React from "react";
import Navbar from "./Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Merge from "./Merge";
import AppDetails from "./AppDetails";
import Footer from "./Footer";
import Story from "./Story";
import "./App.css";

const App = () => {
  return (
      <div className="w-full min-h-screen min-w-fit">
        <div className="bg-black">
          <Navbar />
          <AppDetails />
          <Story />
          <Routes>
            <Route path="/framework" element={<Merge />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
  );
};

export default App;
