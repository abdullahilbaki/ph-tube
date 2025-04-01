// CategoryBtns.tsx

import React, { Suspense, use, useState, useEffect } from "react";
import { BeatLoader, PropagateLoader } from "react-spinners";

interface ButtonProps {
  btnText: string;
  isClicked: boolean;
  onClick: () => void;
  isSearchActive: boolean;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  isClicked,
  onClick,
  isSearchActive,
}) => {
  const buttonClassName = isClicked
    ? isSearchActive
      ? "bg-gray-300"
      : "bg-red-500 text-white hover:bg-red-600"
    : "bg-gray-300";
  return (
    <button
      onClick={onClick}
      className={`px-4 p-1 font-medium rounded-sm 
        outline-none ${buttonClassName} ${
        isSearchActive
          ? "cursor-not-allowed"
          : `hover:bg-gray-200 cursor-pointer transition-all duration-200 
          ease-in-out transform hover:scale-105 active:scale-95`
      }`}
      disabled={isSearchActive}
    >
      {btnText}
    </button>
  );
};

interface Category {
  category_id: string;
  category: string;
}

interface ApiResponse {
  categories: Category[];
}

interface ShowCategoryBtnsProps {
  buttonPromise: Promise<ApiResponse>;
  onCategoryChange: (categoryId: string | null) => void;
  isSearchActive: boolean;
}

const ShowCategoryBtns: React.FC<ShowCategoryBtnsProps> = ({
  buttonPromise,
  onCategoryChange,
  isSearchActive,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const apiResponse: ApiResponse = use(buttonPromise);
  const categoryBtns: Category[] = apiResponse.categories;

  useEffect(() => {
    if (isSearchActive) {
      setActiveCategoryId(null);
      onCategoryChange(null);
    }
  }, [isSearchActive, onCategoryChange]);

  if (!categoryBtns) {
    return (
      <div className="flex justify-center mt-8">
        <PropagateLoader />
      </div>
    );
  }

  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategoryId(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div
      className="container mx-auto px-4 sm:px-0 py-6 flex flex-wrap 
      items-center justify-center gap-3"
    >
      <Button
        btnText="All"
        isClicked={activeCategoryId === null}
        onClick={() => handleCategoryClick(null)}
        isSearchActive={isSearchActive}
      />
      {categoryBtns.map((category) => (
        <Button
          key={category.category_id}
          btnText={category.category}
          isClicked={activeCategoryId === category.category_id}
          onClick={() => handleCategoryClick(category.category_id)}
          isSearchActive={isSearchActive}
        />
      ))}
    </div>
  );
};

const buttonPromise: Promise<ApiResponse> = fetch(
  "https://openapi.programming-hero.com/api/phero-tube/categories"
).then((res) => res.json());

const GetCategoryBtns: React.FC<{
  onCategoryChange: (categoryId: string | null) => void;
  isSearchActive: boolean;
}> = ({ onCategoryChange, isSearchActive }) => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-8">
          <BeatLoader />
        </div>
      }
    >
      <ShowCategoryBtns
        buttonPromise={buttonPromise}
        onCategoryChange={onCategoryChange}
        isSearchActive={isSearchActive}
      />
    </Suspense>
  );
};

export default GetCategoryBtns;
