import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";

const ImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handelImageChange}
        className="hidden"
      />

      {!image ? (
        <button
          className=" cursor-pointer w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-[2px] border border-slate-200/70"
          onClick={() => {
            onChooseFile();
          }}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        <div
          className="w-full h-[300px] relative rounded-xl cursor-pointer"
          onClick={() => {
            onChooseFile();
          }}
        >
          <img
            className="w-full h-full object-cover rounded-xl"
            src={previewUrl}
            alt="selected"
          />

          <div className=" absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%] px-1 py-4 border-4 border-cyan-50/50 w-[350px]">
            <h1 className="font-extrabold tracking-[1px] text-[22px] text-center text-cyan-50/50">
              Click Here to Change Image
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
