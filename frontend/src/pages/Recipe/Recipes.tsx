import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllRecipes } from "../../redux/features/Recipe/recipeSlice";
import { Link } from "react-router-dom";

const Recipes = () => {
  const { recipes } = useAppSelector((state) => state.recipe);
  console.log(recipes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  return (
    <section className='pb-4 pt-4'>
      <div className='d-flex mb-2 align-items-center'>
        <h2>Recipes</h2>
        <a href='/recipes' className='ms-auto'>
          View More
        </a>
      </div>

      <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
        {recipes
          .map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              className='col text-center category__link'
              key={recipe._id}
            >
              <div className='category__img category__img--large shadow'>
                <img src={recipe.image} alt={recipe.name} loading='lazy' />
              </div>
              <div className='pt-1'>
                <h5 className='mb-0'>{recipe.name}</h5>
              </div>
            </Link>
          ))
          .slice(0, 5)}
      </div>

      {/* <div className='d-flex mb-2 align-items-center'>
        <h2>American Recipes</h2>
        <a href='/categories/American' className='ms-auto'>
          View More
        </a>
      </div>

      <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
        <a
          href='/recipe/<%= recipe._id%>'
          className='col text-center category__link'
        >
          <div className='category__img category__img--large shadow'>
            <img src='' alt='' loading='lazy' />
          </div>
          <div className='pt-1'>
            <h5 className='mb-0'>Recipe Name</h5>
            <p className='mb-0'>Recipe Description</p>
          </div>
        </a>
      </div> */}
    </section>
  );
};

export default Recipes;
