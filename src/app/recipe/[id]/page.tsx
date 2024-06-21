'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Banner from '@/components/Banner';
import RecipeSkeleton from '@/components/RecipeSkeleton';

const RecipePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      };

      fetchRecipe();
    }
  }, [id]);

  if (!recipe) return <RecipeSkeleton />;

  const mockCookTime = recipe.strArea === "American" ? 45 : 30; // Tiempo de cocción simulado
  const mockReviews = Math.floor(Math.random() * 100); // Reseñas simuladas
  const mockRating = Math.floor(Math.random() * 5) + 1; // Calificación simulada

  const ingredientImages = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}`];
    return ingredient ? (
      <Image
        key={i}
        src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
        alt={ingredient}
        width={50}
        height={50}
        className="rounded-full"
      />
    ) : null;
  }).filter(Boolean);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold h2">{recipe.strMeal}</h2>
        <p className="text-gray-600">Cooking time: {mockCookTime} mins</p>
        <div className="flex items-center text-yellow-500 mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 fill-current ${index < mockRating ? 'text-yellow-500' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 14.25l-4.265 2.44a.75.75 0 01-1.15-.651l.81-4.735-3.455-3.376a.75.75 0 01.416-1.292l4.77-.694L8.68 2.77a.75.75 0 011.34 0l2.29 4.647 4.77.694a.75.75 0 01.416 1.292l-3.455 3.376.81 4.735a.75.75 0 01-1.15.65L10 14.25z"
                clipRule="evenodd"
              />
            </svg>
          ))}
          <p className="ml-1">{mockReviews} reviews</p>
        </div>
        <div className="flex justify-center mb-4">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
          <ul className="grid grid-cols-2 gap-4">
            {Array.from({ length: 20 }, (_, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`];
              const measure = recipe[`strMeasure${i + 1}`];
              return ingredient ? (
                <li key={i} className="flex items-center">
                  {ingredientImages[i]}
                  <span className="ml-2">
                    {ingredient} - {measure}
                  </span>
                </li>
              ) : null;
            })}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
