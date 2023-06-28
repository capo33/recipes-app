import React, { useEffect } from "react";
import { Link } from "react-router-dom";
 import { BsFillPersonFill, BsHeart } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineFieldTime, AiOutlineEye } from "react-icons/ai";

import { formatDate, subStringFunc } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllRecipes } from "../../redux/features/Recipe/recipeSlice";

import "./recipe.css";

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
        <Link to='/recipes' className='ms-auto'>
          View More
        </Link>
      </div>
      <div className='row  '>
        {recipes
          .map((recipe) => (
            // <Link
            //   to={`/recipe/${recipe._id}`}
            //   className='col text-center category__link'
            //   key={recipe._id}
            // >
            //   <div className='category__img category__img--large shadow'>
            //     <img
            //       src={recipe.image}
            //       alt={recipe.name}
            //       loading='lazy'
            //       className='w-100 h-100'
            //     />
            //   </div>
            //   <div className='pt-1'>
            //     <h5 className='mb-0'>{recipe.name}</h5>
            //   </div>
            // </Link>

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
                    {/* <button className='icon-button'>
                    </button> */}
                    {/* <FaRegHeart style={{ cursor: "pointer" }} /> */}
                      <BsHeart style={{ cursor: "pointer" }}  />
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
          ))
          .slice(0, 5)}
      </div>
    </section>
  );
};

export default Recipes;
