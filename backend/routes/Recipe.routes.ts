import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();

router.get("/", recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.put("/saveRecipe", protect, recipeController.saveRecipe);
router.put("/unsaveRecipe", protect, recipeController.unsaveRecipe);
router.post("/", protect, recipeController.createRecipe);
router.put("/:recipeId", protect, recipeController.updateRecipe);
router.delete("/:recipeId", protect, recipeController.deleteRecipe);

router.get("/savedRecipes/ids/:id", recipeController.getSavedRecipes); // Saved recipes
router.get("/savedRecipes/:id", recipeController.getRecipesByUser); // Own recipes


export default router;