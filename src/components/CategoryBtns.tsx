import React from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      className="px-4 p-1 bg-gray-300 font-medium rounded-sm 
    hover:bg-gray-200 outline-none transition-all duration-200 ease-in-out
      transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      {text}
    </button>
  );
};

const CategoryBtns = () => {
  return (
    <div
      className="container mx-auto px-4 sm:px-0 py-6 flex items-center 
      justify-center"
    >
      <Button text="All" />
    </div>
  );
};

export default CategoryBtns;
