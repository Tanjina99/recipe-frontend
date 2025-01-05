import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import the AOS CSS file
const LatestRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setRecipes(result.data.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();

    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto p-4 py-16 pt-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4 font-serif">
        Simple and tasty latest recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe._id}
            data-aos={
              // Every 2 cards will alternate between left and right
              index % 4 === 0 || index % 4 === 1 ? "fade-left" : "fade-right"
            }
            data-aos-delay={index * 150}
            data-aos-duration="1200"
            className="card bg-amber-100 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-48">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between">
              <h2 className="card-title text-xl font-semibold mb-2">
                {recipe.title}
              </h2>
              <p>
                Experience the rich flavors and unique combinations of this
                delicious recipe!
              </p>
              <div className="mt-4">
                <p className="text-sm text-amber-600 font-medium">
                  <span className="text-amber-400">Author:</span>{" "}
                  {recipe.author.fullName}
                </p>
              </div>
              <div className="card-actions flex justify-start mt-2">
                <Link to={`/single-recipe/${recipe._id}`}>
                  <div className="flex">
                    <button className="btn bg-gray-100 px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                      View Recipe
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 ">
        <Link to="/recipes">
          <button className="btn bg-gray-100 px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            Show All Recipes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestRecipe;
