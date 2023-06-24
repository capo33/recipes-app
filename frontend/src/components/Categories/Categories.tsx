import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/features/Category/categorySlice";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useAppSelector((state) => state.category);
  console.log(categories);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    // <div>
    //   <h1>Categories</h1>
    //   <div className='row'>
    //     {categories.map((category) => (
    //       <div className='col-md-4' key={category._id}>
    //         <div className='card'>
    //           <div className='card-body'>
    //             <h5 className='card-title'>{category.name}</h5>
    //             <img
    //               src={category.image}
    //               alt={category?.name}
    //               className='img-fluid'
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className='row row-cols-2 row-cols-lg-6 g-2 g-lg-3 py-4'>
      {categories.map((category) => (
        <Link
          to={`/categories/${category._id}`}
          className='col text-center category__link'
          key={category._id}
        >
          <div className='category__img shadow'>
            <img src={category.image} alt={category.name} loading='lazy' />
          </div>
          <div className='pt-1'>{category.name}</div>
        </Link>
      ))}

      <a href='/categories' className='col text-center category__link'>
        <div className='category__img shadow'>
          <img
            src='img/view-all.jpg'
            alt='View All Categories'
            loading='lazy'
          />
        </div>
        <div className='pt-1'>View All</div>
      </a>
    </div>
  );
};

export default Categories;
