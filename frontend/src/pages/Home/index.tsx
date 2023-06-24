import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";

import Landing from "./Landing";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Index = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = user?.token;
  const userID = user?._id;

  return (
    <>
      {/* <section className='bg-white dark:bg-gray-900 mb-5'>
        <Landing />
        <h2>
          <div className='mx-auto px-5'>
            <div className=' flex justify-between'>
              <div className='text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-teal-600 uppercase'>
                <GiRiceCooker className='w-6 h-6 mr-3' />
                Recipes
              </div>
              <Link to='/' className='font-semibold inline-block'></Link>
            </div>
          </div>
        </h2>
        <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3 '>
          {recipes &&
            recipes?.map((recipe: Recipe) => (
              <BLogCard key={recipe._id} recipe={recipe} />
            ))}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum maiores nam optio mollitia natus aperiam nulla, distinctio commodi! Voluptatem sint doloremque libero ea, nemo vero omnis quaerat aperiam voluptates quos.
        </div>
      </section> */}
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
      </div>
    </>
  );
};

export default Index;
