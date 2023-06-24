import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();

router.get("/", recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.post("/", protect, recipeController.createRecipe);
router.put("/:recipeId", protect, recipeController.updateRecipe);
router.delete("/:recipeId", protect, recipeController.deleteRecipe);

export default router;