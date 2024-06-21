import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Importa la etiqueta Image de Next.js

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        if (id) {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">{recipe.strMeal}</h1>
        <div className="relative w-full h-64 my-4">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
