import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchRecipeDetail = async () => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals[0]);
      };

      fetchRecipeDetail();
    }
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover my-4" />
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
