import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";

type CookingTimeProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CookingTime = ({ recipe, handleChange }: CookingTimeProps) => {
  return (
    <div>
      <label htmlFor='cookingTime'>Cooking Time (minutes)
      </label>
      <input
        type='number'
        name='cookingTime'
        value={recipe.cookingTime}
        onChange={handleChange}
        id='cookingTime'
        className='form-control'
      />
    </div>
  );
};

export default CookingTime;
