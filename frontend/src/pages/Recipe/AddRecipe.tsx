import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Button from "../../components/Button/Button";
import { Recipe } from "../../interfaces/RecipeInterface";
import Category from "../../components/RecipeForm/Category";
import RecipeName from "../../components/RecipeForm/RecipeName";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Ingredients from "../../components/RecipeForm/Ingredients";
import Instructions from "../../components/RecipeForm/Instructions";
import UploadPicture from "../../components/RecipeForm/UploadPicture";
import { createRecipe } from "../../redux/features/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const recipeData = {
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: { _id: "", name: "", image: "", slug: "" },

    owner: {
      _id: user?._id as string,
    },
  };
  const [recipe, setRecipe] = useState<Recipe>(recipeData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  // Change handler for input field
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Click handler for adding ingredients
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  // Click handler for deleting ingredients
  const handleDelete = (ingredient: string) => {
    const newIngredients = recipe.ingredients.filter(
      (ing) => ing !== ingredient
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // Submit handler for form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRecipe({ formData: recipe, token }));
    navigate("/");
    setRecipe(recipeData);
  };

  // Upload image handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.currentTarget?.files?.[0];
    const formData = new FormData();
    formData.append("image", file as Blob);
    setUploading(true);
    try {
      const response = await axios.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipe({ ...recipe, image: response.data.image });
      setUploading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setUploading(false);
    }
  };

  return (
    <>
      <div className='py-5 text-center'>
        <h1 className='display-5 fw-bold'>
          Create your recipe and share it to the world!
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            "Cooking is like painting or writing a song. Just as there are only
            so many notes or colors, there are only so many flavors—it’s how you
            combine them that sets you apart."
          </p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-8'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3'>
              <RecipeName recipe={recipe} handleChange={handleChange} />

              <div className='col-12'>
                <Ingredients
                  recipe={recipe}
                  handleDelete={handleDelete}
                  handleClick={handleClick}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>

              <div className='col-12'>
                <Instructions recipe={recipe} handleChange={handleChange} />
              </div>

              <div className='col-6'>
                <CookingTime recipe={recipe} handleChange={handleChange} />
              </div>

              <div className='col-6'>
                <Category recipe={recipe} handleChange={handleChange} />
              </div>

              <div className=' '>
                <UploadPicture
                  handleUpload={handleUpload}
                  uploading={uploading}
                />
              </div>

              <div className='col-12'>
                <Button
                  children='Add recipe'
                  type='submit'
                  className='btn btn-dark'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
