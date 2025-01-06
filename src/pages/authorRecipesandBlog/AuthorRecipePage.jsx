import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorRecipesPage = () => {
  const { id } = useParams();
  const [authorRecipes, setAuthorRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipesByAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/author/${id}`
        );
        console.log(response.data.data);
        if (response.data && response.data.data) {
          setAuthorRecipes(response.data.data);
        } else {
          setAuthorRecipes([]);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      }
    };

    fetchRecipesByAuthor();
  }, [id]);

  return (
    <div className="container mx-auto p-6 py-10 bg-amber-100">
      <h1 className="text-3xl sm:text-4xl text-center text-black mb-6 font-serif">
        Recipes by Author
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {authorRecipes.length > 0 ? (
          authorRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <figure className="relative overflow-hidden rounded-lg">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </figure>

              {/* Recipe Content */}
              <div className="mt-6">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <p className="text-sm">Category: {recipe.category}</p>
                <p className="text-sm">Serves: {recipe.servings}</p>
                <button className="btn bg-gray-100 py-1 px-3 text-xs rounded-full mt-2 w-28 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No recipes found for this author.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorRecipesPage;
