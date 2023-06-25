import React from "react";

const RecipeButton = () => {
  return (
    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
      <button
        type='submit'
        className='w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500'
      >
        Add Recipe
      </button>
    </div>
  );
};

export default RecipeButton;
