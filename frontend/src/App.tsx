import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Header from "./components/Header";
import AddCategory from "./pages/Category/AddCategory";
import Categories from "./components/Categories/Categories";
import AddRecipe from "./pages/Recipe/AddRecipe";

function App() {
  return (
    <div
      className='container px-md-5 bg-white shadow-lg mx-auto py-5'
      // style={{ height: "100vh" }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/categories' element={<Categories />} />

          {/* <Route path='/register' element={<Register />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/recipe-details/:id' element={<RecipeDetails />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
