import React, { Suspense, use } from "react";

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

interface Category {
  category_id: string;
  category: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  categories: Category[];
}

const ShowCategoryBtns: React.FC<{ buttonPromise: Promise<ApiResponse> }> = ({
  buttonPromise,
}) => {
  const apiResponse: ApiResponse = use(buttonPromise);
  const categoryBtns: Category[] = apiResponse.categories;

  if (!categoryBtns) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="container mx-auto px-4 sm:px-0 py-6 flex items-center 
      justify-center gap-3"
    >
      <Button btnText="All" />
      {categoryBtns.map((category) => (
        <Button key={category.category_id} btnText={category.category} />
      ))}
    </div>
  );
};

const buttonPromise: Promise<ApiResponse> = fetch(
  "https://openapi.programming-hero.com/api/phero-tube/categories"
).then((res) => res.json());

const GetCategoryBtns: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShowCategoryBtns buttonPromise={buttonPromise} />
    </Suspense>
  );
};

export default GetCategoryBtns;
