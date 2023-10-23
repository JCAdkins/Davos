import { useRef, useState } from "react";
import { auth } from "../../utils/firebase";
import upLoadImage from "../../services/uploadImage";

const FileDropZone = ({ fileType, clearModal, setUser }) => {
  const inputRef = useRef(null);
  const [displayMessage, setDisplayMessage] = useState(
    <>
      {" "}
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG, WEBP or GIF (MAX. 800x400px)
      </p>
    </>
  );

  const validateInput = (event) => {
    const file = event.target.files[0];
    if (!fileType.includes(file.type)) {
      setDisplayMessage(
        <>
          {" "}
          <p className="mb-2 text-sm text-red-400 dark:text-red-500">
            <span className="font-semibold">Error: Invalid file!</span>
          </p>
          <p className="text-xs text-red-400 dark:text-red-500">
            "{file.type}" file type.
          </p>
          <p className="text-xs text-red-400 dark:text-red-500">
            SVG, PNG, JPG or GIF files required.
          </p>
        </>
      );
    } else submitInput(file);
  };

  const submitInput = (file) => {
    const path = upLoadImage(auth.currentUser, file);
    setUser(path);
    clearModal();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {displayMessage}
        </div>
        <input
          ref={inputRef}
          name="dropzone_file"
          id="dropzone_file"
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(event) => validateInput(event)}
        />
      </label>
    </div>
  );
};

export default FileDropZone;
