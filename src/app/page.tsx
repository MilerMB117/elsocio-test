"use client";
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import RecipeCard from '../components/RecipeCard';
import CategoryList from '../components/CategoryList';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 10;

  useEffect(() => {
    // Fetch recipes
    const fetchRecipes = async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    // Fetch categories
    const fetchCategories = async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await res.json();
      setCategories(data.categories.map((cat: any) => cat.strCategory));
    };

    fetchRecipes();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch recipes by selected category
    const fetchRecipesByCategory = async () => {
      let res;
      if (selectedCategory === 'All') {
        res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      }
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    fetchRecipesByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    // Fetch recipes by search query
    const handleSearch = async () => {
      let res;
      if (searchQuery === '') {
        if (selectedCategory === 'All') {
          res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        } else {
          res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        }
      } else {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      }
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl h2">RECETAS</h2>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="search-input border rounded-xl px-4 py-2"
            />
          </div>
        </div>
        <CategoryList
          categories={categories}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {currentRecipes.map((recipe: any) => (
            <RecipeCard
              key={recipe.idMeal}
              id={recipe.idMeal}
              image={recipe.strMealThumb}
              title={recipe.strMeal}
              reviews={Math.floor(Math.random() * 100)} 
              country={recipe.strArea || 'Unknown'}
              duration="20-30" 
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-xl ${
                currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-white text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;