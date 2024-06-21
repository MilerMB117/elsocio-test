import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";

interface CategoryListProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  const defaultCategoryImage = "/public/default.png";
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    
    const calculateMinWidth = () => {
      if (buttonRef.current) {
        const maxTextLength = categories.reduce(
          (max, category) => (category.length > max ? category.length : max),
          0
        );
        const minWidth = maxTextLength * 8; 
        buttonRef.current.style.minWidth = `${minWidth}px`;
      }
    };

    calculateMinWidth(); 
  }, [categories]);

  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-4 py-2 rounded-xl text-sm ${
          selectedCategory === "All"
            ? "bg-orange-500 text-white"
            : "bg-white text-black"
        }`}
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={category}
          ref={index === 0 ? buttonRef : null} 
          onClick={() => onSelectCategory(category)}
          className={`flex items-center px-4 py-2 rounded-xl text-sm ${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-white text-black"
          }`}
          style={{ minWidth: "10rem" }} 
        >
          <div className="flex items-center">
            <Image
              src={`https://www.themealdb.com/images/category/${category}.png`} // URL de la imagen proporcionada por el API
              alt={category}
              width={30}
              height={30}
              className="object-contain mr-2 rounded-full"
              onError={(e) => {
                // Manejo de errores
                e.currentTarget.src = defaultCategoryImage;
              }}
            />
            <span className="ml-2">{category}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
