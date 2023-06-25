import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { createCategory } from "../../redux/features/Category/categorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Category } from "../../interfaces/RecipeInterface";

const AddCategory = () => {
  const [categoryData, setCategoryData] = React.useState<Category>({
    name: "",
    image: "",
  });

  const [uploading, setUploading] = React.useState<boolean>(false);
  const { category } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((state) => state.auth);

  const token = user?.token as string;
  const userId = user?._id as string;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createCategory({
        categoryData,
        token,
        toast,
        navigate,
      })
    );

    setCategoryData({
      name: "",
      image: "",
    });
  };

  // Upload image handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.currentTarget?.files?.[0];
    const formData = new FormData();
    formData.append("image", file as Blob);
    setUploading(true);
    try {
      const response = await axios.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setCategoryData({
        ...categoryData,
        image: response.data.image,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <div className='py-5 text-center'>
        <h1 className='display-5 fw-bold'>
          {/* Share your amazing recipies with thousands of web developers accross */}
          Add Category
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            {/* Share your amazing recipies with thousands of web developers accross
            the world. Fill our form to get started. */}
            Create a new category
          </p>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-8'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3'>
              <div className='col-12'>
                <label htmlFor='name' className='form-label'>
                  Name
                </label>
                <input
                  type='name'
                  name='name'
                  id='name'
                  value={categoryData.name}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, name: e.target.value })
                  }
                  className='form-control'
                />
              </div>

              <div className='col-12'>
                <label htmlFor='image'>Image</label>
                <input
                  type='file'
                  className='form-control'
                  name='image'
                  accept='image/*'
                  onChange={handleUpload}
                />
              </div>
              {uploading && <p>Uploading image...</p>}

              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Add Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
