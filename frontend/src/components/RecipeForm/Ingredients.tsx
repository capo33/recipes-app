import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { MdOutlineDeleteForever } from "react-icons/md";
type IngredientProps = {
  recipe: Recipe;
  handleDelete: (ingredient: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const Ingredients = ({
  recipe,
  handleDelete,
  handleClick,
  inputValue,
  setInputValue,
}: IngredientProps) => {
  return (
    <div>
      <section aria-labelledby='filter-heading'>
        <div className='bg-gray-50'>
          <div className=' flex flex-col'>
            <div className='flex flex-wrap'>
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className='alert alert-primary' role='alert'>
                  {recipe.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      style={{
                        paddingRight: "0.5rem",
                      }}
                    >
                      {ingredient}
                      <MdOutlineDeleteForever
                        onClick={() => handleDelete(ingredient)}
                        style={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          textAlign: "center",
                        }}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby='products-heading' className=' '>
        <div className=' '>
          <div className=' '>
            <div className='flex'>
              <div className='col-12'>
                <label htmlFor='add-ingredients'>Ingredients</label>
                <br />
                <small>
                  Example:{" "}
                  <span className='link-secondary'>
                    Milk, Sugar, Chocolate, Vanilla Extract
                  </span>
                </small>
                <div>
                  <div className='mb-1'>
                    <input
                      type='text'
                      name='add-ingredients'
                      id='add-ingredients'
                      aria-describedby='add-ingredients'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className='form-control'
                      required
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <button
                  type='button'
                  className='btn btn-outline-primary'
                  onClick={handleClick}
                >
                  + Ingredient
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
