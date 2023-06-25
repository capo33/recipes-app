import React, { useEffect } from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllCategories } from "../../redux/features/Category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

type CategoryProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Category = ({ recipe, handleChange }: CategoryProps) => {
  const { categories } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <label htmlFor='category'>Category</label>
      <select
        id='category'
        name='category'
        value={recipe.category._id}
        onChange={handleChange}
        className='form-select form-control'
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
