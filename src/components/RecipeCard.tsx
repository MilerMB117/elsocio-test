import { FC } from "react";
import Image from "next/image";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

interface RecipeCardProps {
  image: string;
  title: string;
  reviews: number;
  country: string;
  continent: string;
  duration: string;
  isLoading?: boolean;
}

const RecipeCard: FC<RecipeCardProps> = ({
  image,
  title,
  reviews,
  country,
  continent,
  duration,
  isLoading = false,
}) => {
  if (isLoading) {
    return <RecipeCardSkeleton />;
  }

  return (
    <div className="bg-white shadow-lg overflow-hidden card">
      <Image
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        width={500}
        height={500}
      />
      <div className="p-4">
        <h2 className="text-xl title-card">{title}</h2>
        <p className="text-yellow-500">⭐ {reviews}</p>
        <p>
          {country}, {continent}
        </p>
        <p>{duration} mins</p>
      </div>
    </div>
  );
};

export default RecipeCard;
