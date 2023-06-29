import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import {
  getSavedRecipes,
  getSingleRecipe,
} from "../../redux/features/Recipe/recipeSlice";
import { BiCategoryAlt } from "react-icons/bi";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes } = useAppSelector((state) => state.recipe);
  const token = user?.token as string;
  const userID = user?.result?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);
  const dispatch = useAppDispatch();
  console.log(recipe);
  console.log(id);

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
  }, [dispatch, id]);

  return (
    <div className='container px-md-5 bg-white shadow-lg'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'></li>
        </ol>
      </nav>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <img
            src={recipe?.image}
            alt={recipe?.name}
            className='img-fluid rounded'
            loading='lazy'
          />
        </div>

        <div className='col-12 col-md-8'>
          <div className='row'>
            <div className='col-12'>
              <h1>{recipe?.name}</h1>
            </div>
            <div className='col-12 mb-4'>
              <BiCategoryAlt /> {recipe?.category?.name}
             </div>
            <div className='col-12'>
              <h4>Cooking Instructions</h4>
              <p>{recipe?.instructions}</p>
            </div>
          </div>

          <div className='row pt-4'>
            <div className='col-12'>
              <h4>Ingredients</h4>
              <ul className='list-group list-group-flush'>
                {recipe?.ingredients?.map((ingredient) => (
                  <li className='list-group-item' key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
