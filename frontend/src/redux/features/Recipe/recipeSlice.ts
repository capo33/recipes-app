import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeServices from "./recipeServices";
import { CreateRecipe, Recipe } from "../../../interfaces/RecipeInterface";

interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe | null;
  savedRecipes: Recipe[];
  owenSavedRecipes: Recipe[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
  savedRecipes: [],
  owenSavedRecipes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// *************************** Recipe *************************** //
// get all recipes
export const getAllRecipes = createAsyncThunk(
  "recipe/getAllRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await recipeServices.getAllRecipes();
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Create a recipe
export const createRecipe = createAsyncThunk<Recipe, CreateRecipe>(
  "recipe/createRecipe",
  async ({ formData, token }, thunkAPI) => {
    try {
      const response = await recipeServices.createRecipe(formData, token);
      thunkAPI.dispatch(getAllRecipes());
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Uploading images
export const uploadImages = createAsyncThunk(
  "recipe/uploadImages",
  async ({ data, token }: { data: string; token: string }, thunkAPI) => {
    try {
      const response = await recipeServices.uploadRecipeImage(data, token);
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get saved recipes
export const getSavedRecipes = createAsyncThunk(
  "recipe/getSavedRecipes",
  async ({ userID, token }: { userID: string; token: string }, thunkAPI) => {
    try {
      const response = await recipeServices.getRecipesByUserId(userID, token);
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Save a recipe
export const saveRecipe = createAsyncThunk(
  "recipe/saveRecipe",
  async (
    {
      recipeID,
      userID,
      token,
    }: { recipeID: string; userID: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.saveRecipe(recipeID, userID, token);
      thunkAPI.dispatch(getSavedRecipes({ userID, token }));
      return response?.data?.savedRecipes;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Unsave a recipe
export const unsaveRecipe = createAsyncThunk(
  "recipe/unsaveRecipe",
  async (
    {
      recipeID,
      userID,
      token,
    }: { recipeID: string; userID: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.unsaveRecipe(
        recipeID,
        userID,
        token
      );

      thunkAPI.dispatch(getSavedRecipes({ userID, token }));
      return response?.data?.savedRecipes;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all recipes
    builder.addCase(getAllRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.recipes = payload;
    });
    builder.addCase(getAllRecipes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Create a recipe
    builder.addCase(createRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = payload as Recipe;
    });
    builder.addCase(createRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get saved recipes
    builder.addCase(getSavedRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSavedRecipes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(getSavedRecipes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Save a recipe
    builder.addCase(saveRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(saveRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Unsave a recipe
    builder.addCase(unsaveRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unsaveRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(unsaveRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Upload images
  //   builder.addCase(uploadImages.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
  //     console.log(payload);

  //     state.isLoading = false;
  //     state.isSuccess = true;
  //     state.recipes = payload;
  //   });
  //   builder.addCase(uploadImages.rejected, (state, { payload }) => {
  //     state.isLoading = false;
  //     state.isError = true;
  //     state.message = payload as string;
  //   });
  },
});

export const { setName } = recipeSlice.actions;

export default recipeSlice.reducer;
