import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

interface RecipeCardProps {
  id: string;
  image: string;
  title: string;
  reviews: number;
  country: string;
  duration: string;
  isLoading?: boolean;
}

const RecipeCard: FC<RecipeCardProps> = ({
  id,
  image,
  title,
  reviews,
  country,
  duration,
  isLoading = false,
}) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        const meal = data.meals[0];
        const mockRating = Math.floor(Math.random() * 5) + 1; // Calificación simulada

        if (meal && meal.strMealRating) {
          setRating(parseFloat(meal.strMealRating));
        } else {
          setRating(mockRating); 
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
        setRating(0);
      }
    };

    fetchRating();
  }, [id]);

  if (isLoading || rating === null) {
    return <RecipeCardSkeleton />;
  }

  const stars = Math.round(rating);

  return (
    <Link href={`/recipe/${id}`} legacyBehavior>
      <a className="bg-white shadow-lg overflow-hidden card block w-full">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold h2">{title}</h2>
          <div className="flex items-center text-yellow-500 mb-2">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 fill-current ${
                  index < stars ? "text-yellow-500" : "text-gray-300"
                }`}
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
            <p className="ml-1">{reviews || 'No'} reviews</p>
          </div>
          <div className="flex items-center mt-2">
            <p className="text-gray-600 bg-gray-200 rounded-full inline-block px-3 py-1 text-sm font-semibold mr-2">
              {country}
            </p>
            <p className="text-sm text-gray-500">{duration} mins</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
