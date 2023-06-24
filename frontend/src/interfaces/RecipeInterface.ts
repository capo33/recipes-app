export interface Owner {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Category {
  name: string;
  image: string;
  slug?: string;
  _id?: string;
}


export interface Recipe {
  _id?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cookingTime: number;
  category: Category;
  owner: Owner;
  likes?: string[];
  views?: number;
  reviews?: string[];
  rating?: number;
  numReviews?: number;
  slug?: string;
  createdAt?: number;
  
}

export interface CreateRecipe {
  formData: Recipe;
  token: string;
}
