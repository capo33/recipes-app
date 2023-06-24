import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import { IReview } from "../interfaces/reviewInterface";
import { IRecipe } from "../interfaces/recipeInterface";

// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await RecipeModel.find({}).populate("owner", "name");
    res.status(200).json(recipes);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    const recipe = await RecipeModel.findById(recipeId).populate(
      "owner",
      "-password"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

//@desc     Create a recipe
//@route    POST /api/v1/recipes
//@access   Private
const createRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newRecipe = await RecipeModel.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(newRecipe);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
const updateRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the owner of the recipe
    if (recipe?.owner.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe,
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the owner of the recipe
    if (recipe?.owner.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await RecipeModel.findByIdAndDelete(recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
