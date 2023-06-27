import React from "react";

type UploadPictureProps = {
  uploading: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadPicture = ({ uploading, handleUpload }: UploadPictureProps) => {
  return (
    <div>
      <label htmlFor='image'>Picture</label>
      <input
        style={{ cursor: "pointer" }}
        id='image'
        type='file'
        name='image'
        accept='image/*'
        onChange={handleUpload}
        className='form-control'
      />
      {uploading && <p>Uploading image...</p>}
    </div>
  );
};

export default UploadPicture;
