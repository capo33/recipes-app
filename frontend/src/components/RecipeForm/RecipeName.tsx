import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";

type RecipeNameProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RecipeName = ({ recipe, handleChange }: RecipeNameProps) => {
  return (
    <div className='col-12'>
      <label
        htmlFor='name'
        className='text-lg leading-6 font-medium form-label'
      >
        Recipe Name
      </label>

      <input
        type='text'
        name='name'
        id='name'
        value={recipe.name}
        onChange={handleChange}
        className='form-control'
      />
    </div>
  );
};

export default RecipeName;
