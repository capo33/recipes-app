import axios from "axios";

import { CATEGORY_URL } from "../../../constants/constants";

// *************************** Category *************************** //
// get all categories
const getAllCategories = async () => {
  const response = await axios.get(`${CATEGORY_URL}`);
  return response.data;
};

// get category by slug
const getCategoryBySlug = async (slug: string) => {
  const response = await axios.get(`${CATEGORY_URL}/${slug}`);
  return response.data;
};

interface ICategoryData {
  name: string;
  image: string;
}
// create category
const createCategory = async (categoryData: ICategoryData, token: string) => {
  const response = await axios.post(
    `${CATEGORY_URL}`,
    { ...categoryData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// update category
const updateCategory = async (id: string, name: string, token: string) => {
  const response = await axios.put(
    `${CATEGORY_URL}/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// delete category
const deleteCategory = async (id: string, token: string) => {
  const response = await axios.delete(`${CATEGORY_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const categoryServices = {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryServices;
