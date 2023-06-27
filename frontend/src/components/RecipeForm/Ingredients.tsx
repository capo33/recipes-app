import React from "react";
import { BiSolidAddToQueue } from "react-icons/bi";

import Button from "../Button/Button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Recipe } from "../../interfaces/RecipeInterface";

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
      <section>
        <div className='bg-gray-50'>
          <div className=' flex flex-col'>
            <div className='flex flex-wrap'>
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className='alert alert-info' role='alert'>
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

      <section>
        <div className='col-6'>
          <div>
            <label htmlFor='add-ingredients'>
              Ingredients
              <input
                type='text'
                name='add-ingredients'
                id='add-ingredients'
                aria-describedby='add-ingredients'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='form-control'
              />
            </label>
            <Button
              type='button'
              className='btn btn-dark mx-2'
              handleClick={handleClick}
              children={<BiSolidAddToQueue />}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
