import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";

type InstructionsProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Instructions = ({ recipe, handleChange }: InstructionsProps) => {
  return (
    <div>
      <label htmlFor='instructions' className='text-lg leading-6 font-medium '>
        Instructions
      </label>

      <div className='mt-1'>
        <textarea
          name='instructions'
          value={recipe.instructions}
          onChange={handleChange}
          id='desc'
          className='form-control'
          cols={30}
          rows={4}
        />
      </div>
    </div>
  );
};

export default Instructions;
