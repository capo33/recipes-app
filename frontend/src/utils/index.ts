// uper case first letter
export const uperCaseFirstLetter = (str:string) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

// format date
export const formatDate = (date = Date.now()) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  return `${day}/${month}/${year} ${hours}:00`;
};

// render details
// export const RenderDetails = ({ name, value }) => {
//   return (
//     <div className='text-sm leading-normal mt-0 mb-2 text-orange-600 '>
//       <span className='mr-2 text-blue-800 text-lg capitalize'>{name}:</span>
//       <span className='text-lg'>{value ? value : `No ${name}`}</span>
//     </div>
//   );
// };

// sub string
export const subStringFunc = (str: string, length: number) => {
  if (str?.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

// React quill editor
export const modules = {
  toolbar: [
    [{ header: [1, 2, false] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
 };

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];
