import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllRecipes } from "../../redux/features/Recipe/recipeSlice";

import "./recipe.css";

const Recipes = () => {
  const { recipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <section className='pb-4 pt-4'>
      <div className='d-flex mb-2 align-items-center'>
        <h2>Recipes</h2>
        <Link to='/recipes' className='ms-auto'>
          View More
        </Link>
      </div>
      <div className='row'>
        {recipes.map((recipe) => <RecipeCard recipe={recipe} />).slice(0, 5)}
      </div>
    </section>
  );
};

export default Recipes;
