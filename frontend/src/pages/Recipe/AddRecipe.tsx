import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Category from "../../components/RecipeForm/Category";

import { Recipe } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllCategories } from "../../redux/features/Category/categorySlice";
import Ingredients from "../../components/RecipeForm/Ingredients";
import RecipeName from "../../components/RecipeForm/RecipeName";
import Instructions from "../../components/RecipeForm/Instructions";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: { _id: "", name: "", image: "", slug: "" },

    owner: {
      _id: user?._id as string,
    },
  });

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
    // dispatch(createRecipe({ formData: recipe, token }));
    navigate("/");
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      image: "",
      cookingTime: 0,
      category: { _id: "", name: "", image: "", slug: "" },
      owner: {
        _id: user?._id as string,
      },
    });
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
          <form>
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
                {/* <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  className='form-control'
                  cols={30}
                  rows={4}
                ></textarea> */}
                <Instructions recipe={recipe} handleChange={handleChange} />
              </div>

              <div className='col-12'>
                <Category recipe={recipe} handleChange={handleChange} />
              </div>

              <div className='col-12'>
                <label htmlFor='image'>Product Image</label>
                <input
                  type='file'
                  className='form-control'
                  name='image'
                  accept='image/*'
                />
              </div>

              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Submit Recipe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
