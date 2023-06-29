import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { uperCaseFirstLetter } from "../../utils";
import { logout } from "../../redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getSavedRecipes } from "../../redux/features/Recipe/recipeSlice";

const Index = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const avatar = user?.result?.avatar;
  const admin = user?.result?.isAdmin;
 
  useEffect(() => {
    dispatch(
      getSavedRecipes({
        userID: user?.result?._id as string,
        token: user?.token as string,
      })
    );
  }, [dispatch, user?.result?._id, user?.token]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-between py-3 mb-4 border-bottom'>
      {/* Logo */}
      <Link
        to='/'
        className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'
      >
        <img
          width='64'
          height='64'
          src='https://img.icons8.com/external-becris-lineal-color-becris/64/external-recipe-kitchen-cooking-becris-lineal-color-becris-1.png'
          alt='external-recipe-kitchen-cooking-becris-lineal-color-becris-1'
        />
      </Link>

      {/* Search */}
      <div className='col-md-3 text-end'>
        <form method='POST' action='/search'>
          <input
            type='search'
            name='searchTerm'
            className='form-control'
            placeholder='Search...'
            aria-label='Search'
          />
        </form>
      </div>

      {/* Nav */}
      <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
        <li>
          <Link to='/' className='nav-link px-2 link-secondary'>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/saved-recipes'
            className='nav-link px-2 link-secondary position-relative'
          >
            Saved-Recipes{" "}
            {savedRecipes?.length > 0 && (
              <span className='badge rounded-pill bg-danger'>
                {savedRecipes?.length}
              </span>
            )}
          </Link>
        </li>
      </ul>

      <span className='link-info'>
        {user?.result?.name && uperCaseFirstLetter(user?.result?.name)}
      </span>

      {/* Dropdown */}
      <div className='dropdown'>
        <Link
          to='/'
          className='d-block link-dark text-decoration-none dropdown-toggle'
          id='dropdownUser1'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          onClick={handleDropdown}
        >
          {user ? (
            <img
              src={avatar}
              alt='mdo'
              width='32'
              height='32'
              className='rounded-circle'
            />
          ) : (
            "Cooking App"
          )}
        </Link>
        <ul
          className='dropdown-menu text-small'
          aria-labelledby='dropdownUser1'
        >
          {user ? (
            <>
              <li>
                <Link className='dropdown-item' to='/profile'>
                  Profile
                </Link>
                <Link className='dropdown-item' to='/add-recipe'>
                  Add Recipe
                </Link>
              </li>
              <li></li>
              {admin && (
                <li>
                  <Link to='/add-category' className='dropdown-item'>
                    Add Category
                  </Link>
                </li>
              )}
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <Link className='dropdown-item' to='/' onClick={handleLogout}>
                  Sign out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className='dropdown-item' type='button'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register' className='dropdown-item'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Index;
