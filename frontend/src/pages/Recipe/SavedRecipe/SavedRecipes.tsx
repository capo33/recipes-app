import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoBookmarkSlashFill } from "react-icons/go";

import { userProfile } from "../../../redux/features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { unsaveRecipe } from "../../../redux/features/Recipe/recipeSlice";

import "./savedRecipes.css";

const SavedRecipes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?.result?._id as string;

  console.log("savedRecipes", savedRecipes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userProfile(token));
  }, [dispatch, token, userID]);

  const handleUnsaveRecipe = (recipeID: string) => {
    dispatch(
      unsaveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  return (
    <div className='row'>
      {savedRecipes?.length === 0 && (
        <p>
          You have no saved recipes. Go to <Link to='/'>Home</Link> to save
          recipes.
        </p>
      )}
      {savedRecipes?.map((recipe) => (
        <div className='col-sm-6 col-md-6 col-lg-6'>
          <div className='card bg-white p-3 mb-4 shadow'>
            <div className='d-flex justify-content-between mb-4'>
              <div className='recipe-info'>
                <div className='recipe-info__img'>
                  <Link to={`/recipe/${recipe._id}`}>
                    <img src={recipe?.image} alt={recipe.name} />
                  </Link>
                </div>
              </div>

              <div>
                <GoBookmarkSlashFill
                  size={30}
                  className='text-danger'
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUnsaveRecipe(recipe._id as string)}
                />
              </div>
            </div>
            <div className='recipe-info__basic'>
              <h5 className='mb-0'>{recipe.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;
