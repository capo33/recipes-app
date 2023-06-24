import slugify from "slugify";
import { Request, Response } from "express";

import CategoryModel from "../models/Category";

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;
    const category = await CategoryModel.create({
      name,
      slug: slugify(name),
      image,
     });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error });
  }
};

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
