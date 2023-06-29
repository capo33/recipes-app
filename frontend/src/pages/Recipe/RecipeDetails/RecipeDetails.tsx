import React, { useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

import {
  getSavedRecipes,
  getSingleRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../../../redux/features/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/app/store";
import { getAllCategories } from "../../../redux/features/Category/categorySlice";

import "./recipeDetails.css";
import Button from "../../../components/Button/Button";
import { userProfile } from "../../../redux/features/Auth/authSlice";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?.result?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
    dispatch(getAllCategories());
    dispatch(userProfile(token));
    dispatch(getSavedRecipes({ userID, token }));
  }, [dispatch, id, token, userID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save Recipe
  const handleSaveRecipe = (recipeID: string) => {
    dispatch(
      saveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  // Unsave Recipe
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
    <div className='container pb-5'>
      <div className='row'>
        {/* breadcrumb */}
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              {recipe?.name}
            </li>
          </ol>
        </nav>
        <div className='col-md-6  '>
          <img
            src={recipe?.image}
            alt=''
            className='img-fluid mb-3'
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className='col-md-6'>
          <h3>
            {recipe?.name}
            <span
              onClick={() => {
                recipesIDs?.includes(recipe?._id as string)
                  ? handleUnsaveRecipe(recipe?._id as string)
                  : handleSaveRecipe(recipe?._id as string);
              }}
              style={
                { marginLeft: "1rem", cursor: "pointer" } as React.CSSProperties
              }
            >
              {recipesIDs?.includes(recipe?._id as string) ? (
                <FaBookmark style={{ fontSize: "1.2rem" }} />
              ) : (
                <FaRegBookmark style={{ fontSize: "1.2rem" }} />
              )}
            </span>
          </h3>

          <hr />
          <h4 className='mb-4'>Recipe Owner</h4>
          <div className='media mb-4'>
            <i className='d-flex mr-3 fa fa-user-circle fa-5x text-primary' />
            <div className='media-body'>
              <h5 className='mt-0 font700'>{recipe?.owner?.name}</h5>
              {user?.result?.about && user?.result?.about}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='recipe-content'>
          <ul className='recipe-meta list-inline'>
            <li className='list-inline-item'>
              <BsPerson /> <Link to='/'>{recipe?.owner?.name}</Link>
            </li>
            <li className='list-inline-item'>
              <BiCalendar /> <Link to='/'>29 June 2017</Link>
            </li>
          </ul>
          {/* ingrefients */}
          <h4>Ingredients</h4>
          <ul>
            {recipe?.ingredients?.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions</h4>
          <div className='row'>
            <div className='col-md-6 col-lg-12'>
              <p
                className='lead'
                dangerouslySetInnerHTML={{
                  __html: recipe?.instructions
                    ? recipe?.instructions
                    : "No Instructions",
                }}
              />
            </div>
          </div>

          <hr className='mb-4' />
          <h4 className='mb-4'>Reviwes</h4>
          <div className='media mb-4'>
            <div className='media-body'>
              <h5 className='mt-0 font400 clearfix'>Jane Doe</h5>
              Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
              vestibulum in vulputate at, tempus viverra turpis. Fusce
              condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
              felis in faucibus.
            </div>
          </div>
          <hr className='mb-4' />
          <h4 className='mb-4'>Add Reviews</h4>

          <div className='row'>
            <div className='col-4'>
              <form>
                <div className='row g-3'>
                  <div className='col-12'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='name'
                      name='name'
                      id='name'
                      // value={categoryData.name}
                      // onChange={(e) =>
                      //   setCategoryData({ ...categoryData, name: e.target.value })
                      // }
                      className='form-control'
                    />
                  </div>

                  {/* {uploading && <p>Uploading image...</p>} */}

                  <div className='col-12'>
                    <Button
                      type='submit'
                      children='Add Category'
                      className='btn btn-dark'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
