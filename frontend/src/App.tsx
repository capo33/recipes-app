import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className='container px-md-5 bg-white shadow-lg mx-auto py-5'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/recipe-details/:id' element={<RecipeDetails />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
