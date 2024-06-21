import { FC } from 'react';

interface RecipeCardSkeletonProps {

}
//Skeleton to animate load data and components
const RecipeCardSkeleton: FC<RecipeCardSkeletonProps> = () => {
  return (
    <div className="bg-white shadow-lg overflow-hidden card">
      <div className="animate-pulse w-full h-48 bg-gray-300"></div> 
      <div className="p-4">
        <div className="h-6 bg-gray-300 w-2/3 mb-2"></div> 
        <div className="h-4 bg-gray-300 w-1/2 mb-1"></div> 
        <div className="h-4 bg-gray-300 w-1/3"></div> 
        <div className="h-4 bg-gray-300 w-1/4 mt-2"></div> 
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
