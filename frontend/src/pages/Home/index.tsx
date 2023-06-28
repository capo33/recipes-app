import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";

import Landing from "./Landing";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Categories from "../../components/Categories/Categories";
import Recipes from "../Recipe/Recipes";
import AllCategories from "../Category/AllCategories";

const Index = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = user?.token;
  const userID = user?.result?._id;

  return (
    <>
      <div className='   py-5'>
        <div className='row flex-lg-row-reverse bg-white align-items-center g-5 py-4 mb-4'>
          <div className='col-12 col-lg-6'>
            <img
              src='/img/hero-image.png'
              width='607'
              height='510'
              className='d-block mx-lg-auto img-fluid'
              loading='lazy'
              alt='Cooking with love'
            />
          </div>

          <div className='col-12 col-lg-6'>
            <h1 className='display-5 fw-bold mb-3'>
              Huge selection of delicios recipe ideas
            </h1>
            <p className='lead'>
              Explore our huge selection of delicious recipe ideas including;
              easy desserts, delicious vegan and vegetarian dinner ideas,
              gorgeous pasta recipes, quick bakes, family-friendly meals and
              gluten-free recipes.
            </p>

            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              <Link
                to='/explore-latest'
                className='btn btn-primary btn-dark btn-lg px-4 me-md-2'
              >
                Explore Latest
              </Link>
              <Link
                to='/explore-random'
                className='btn btn-outline-secondary btn-lg px-4 me-md-2'
              >
                Show Random
              </Link>
            </div>
          </div>
        </div>
        <AllCategories />
        <Recipes />
      </div>
    </>
  );
};

export default Index;
