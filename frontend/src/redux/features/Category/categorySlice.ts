import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryServices from "./categoryServices";
import { NavigateFunction } from "react-router-dom";

interface ICategory {
  name: string;
  image: string;
  slug: string;
  _id: string;
}
interface CategoryState {
  categories: ICategory[];
  category: ICategory | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isError: false,

  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryServices.getAllCategories();
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

// Get category by slug
export const getCategoryBySlug = createAsyncThunk(
  "category/getCategoryBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await categoryServices.getCategoryBySlug(slug);
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

interface CategoryCreate {
  categoryData: {
    name: string;
    image: string;
  };
  token: string;
  toast: any;
  navigate: NavigateFunction;
  id?: string;
}

// Create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { categoryData, token, toast, navigate }: CategoryCreate,
    { rejectWithValue }
  ) => {
    try {
      const response = await categoryServices.createCategory(categoryData, token);
      // navigate("/categories");
      toast.success(response?.message);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update category
// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async ({ name, token, id, toast, navigate }: CategoryCreate, { rejectWithValue }) => {
//     try {
//       const response = await categoryServices.updateCategory(id, name, token);
//       navigate("/categories");
//       toast.success(response?.message);
//       return response;
//     } catch (error: unknown | any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       toast.error(message);
//       return rejectWithValue(message);
//     }
//   }
// );

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = actions.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get a category by slug
    builder.addCase(getCategoryBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryBySlug.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(getCategoryBySlug.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Create a new category
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { clearState } = categorySlice.actions;

export default categorySlice.reducer;
