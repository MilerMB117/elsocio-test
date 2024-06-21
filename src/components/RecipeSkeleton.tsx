import React from 'react';

const RecipeSkeleton = () => {
  return (
    <div className="p-4 skeleton-container">
      <div className="skeleton h-8 w-1/2 mb-4"></div>
      <div className="skeleton h-6 w-1/4 mb-4"></div>
      <div className="flex items-center mb-4">
        <div className="skeleton h-6 w-6 mr-2"></div>
        <div className="skeleton h-6 w-1/6"></div>
      </div>
      <div className="skeleton w-full h-64 rounded-lg mb-4"></div>
      <div className="skeleton h-6 w-1/3 mb-2"></div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex items-center">
            <div className="skeleton h-12 w-12 rounded-full mr-2"></div>
            <div className="skeleton h-6 w-full"></div>
          </div>
        ))}
      </div>
      <div className="skeleton h-6 w-1/3 mt-4 mb-2"></div>
      <div className="skeleton h-24 w-full"></div>
    </div>
  );
};

export default RecipeSkeleton;
