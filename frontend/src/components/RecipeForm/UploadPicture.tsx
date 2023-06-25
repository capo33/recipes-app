import React from "react";

type UploadPictureProps = {
  uploading: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadPicture = ({ uploading, handleUpload }: UploadPictureProps) => {
  return (
    <div>
      <label htmlFor='image'>Picture</label>

      <div className='form-control'>
        <label htmlFor='image'>
          <input
            style={{ cursor: "pointer" }}
            id='image'
            type='file'
            name='image'
            onChange={handleUpload}
            className='outline-none'
          />
        </label>
      </div>
      {uploading && <p>Uploading image...</p>}
    </div>
  );
};

export default UploadPicture;
