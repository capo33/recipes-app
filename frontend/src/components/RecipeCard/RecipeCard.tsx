import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

import { formatDate, subStringFunc } from "../../utils";
import { Recipe } from "../../interfaces/RecipeInterface";
import { userProfile } from "../../redux/features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?.result?._id as string;

  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userProfile(token));
  }, [dispatch, token, userID]);

  return (
    <div className='col-md-6 col-lg-4 g-2'>
      <div className='card-list'>
        <article className='card'>
          <figure className='card-image'>
            <img src={recipe.image} alt={recipe.name} className='img' />
          </figure>
          <div className='card_header'>
            <Link to={`/recipe/${recipe._id}`} className='card_link'>
              <h4>{recipe.name}</h4>
            </Link>

            {recipesIDs?.includes(recipe._id) && (
              <span className='badge rounded-pill text-bg-warning'>Saved</span>
            )}
          </div>
          <p>{subStringFunc(recipe.instructions, 20)}</p>

          <div className='card_footer'>
            <div className=' '>
              <AiOutlineEye className='mr-2 mx-1' />
              {recipe.views}
            </div>

            <div className='  mx-2 '>
              <BiCalendar className='mx-1' />
              {formatDate(recipe.createdAt)}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default RecipeCard;
