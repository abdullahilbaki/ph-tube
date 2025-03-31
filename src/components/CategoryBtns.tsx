import React, { Suspense, use, useState } from "react";
import { BeatLoader, PropagateLoader } from "react-spinners";

interface ButtonProps {
  btnText: string;
  isClicked: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ btnText, isClicked, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 p-1 font-medium rounded-sm hover:bg-gray-200 
        outline-none transition-all duration-200 ease-in-out transform 
        hover:scale-105 active:scale-95 cursor-pointer ${
          isClicked ? `bg-red-500 text-white hover:bg-red-600` : `bg-gray-300`
        }`}
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
}

const ShowCategoryBtns: React.FC<ShowCategoryBtnsProps> = ({
  buttonPromise,
  onCategoryChange,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const apiResponse: ApiResponse = use(buttonPromise);
  const categoryBtns: Category[] = apiResponse.categories;

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
      />
      {categoryBtns.map((category) => (
        <Button
          key={category.category_id}
          btnText={category.category}
          isClicked={activeCategoryId === category.category_id}
          onClick={() => handleCategoryClick(category.category_id)}
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
}> = ({ onCategoryChange }) => {
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
      />
    </Suspense>
  );
};

export default GetCategoryBtns;
