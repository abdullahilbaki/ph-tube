import React from "react";

interface ButtonProps {
  btnText: string;
}

const Button: React.FC<ButtonProps> = ({ btnText }) => {
  return (
    <button
      className="px-4 p-1 bg-gray-300 font-medium rounded-sm 
    hover:bg-gray-200 outline-none transition-all duration-200 ease-in-out
      transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      {btnText}
    </button>
  );
};

const CategoryBtns = () => {
  return (
    <div
      className="container mx-auto px-4 sm:px-0 py-6 flex items-center 
      justify-center"
    >
      <Button btnText="All" />
    </div>
  );
};

export default CategoryBtns;
