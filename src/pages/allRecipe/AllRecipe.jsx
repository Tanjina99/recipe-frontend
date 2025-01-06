import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Fish",
    "Salad",
    "Asian",
    "Indian",
    "Mexican",
    "Italian",
    "Baking",
  ];

  const fetchRecipes = async (queryParams = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipes${queryParams}`
      );
      if (Array.isArray(response.data.data)) {
        setRecipes(response.data.data);
        setFilteredRecipes(response.data.data);
      } else {
        console.error("API response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch recipes on initial load
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle category checkbox changes and trigger the fetch automatically
  const handleCategoryChange = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    triggerFilterChange(updatedCategories, searchInput); // Trigger filter update automatically
  };

  // Function to trigger the filtering of recipes based on search and categories
  const triggerFilterChange = (updatedCategories, searchTerm) => {
    const queryParams = new URLSearchParams();

    if (searchTerm.trim()) {
      queryParams.append("search", searchTerm);
    }

    if (updatedCategories.length > 0) {
      queryParams.append("category", updatedCategories.join(","));
    }

    fetchRecipes(`?${queryParams.toString()}`);
  };

  // Automatically trigger filter changes when search input changes
  useEffect(() => {
    triggerFilterChange(selectedCategories, searchInput);
  }, [searchInput, selectedCategories]);

  return (
    <div className="container mx-auto p-6 py-10 bg-amber-100">
      <h1 className="text-3xl sm:text-3xl text-center text-black mb-6 font-serif">
        Explore Our All Delicious Recipes
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search recipes by title"
            className="input input-bordered w-full px-6 py-3 rounded-lg shadow-md focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={() => triggerFilterChange(selectedCategories, searchInput)}
          className="btn bg-gray-100 py-1 px-4 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          Search
        </button>

        {/* Category Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-gray-100 m-1 -ml-2 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            Select Category
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="checkbox checkbox-sm"
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recipe Cards Grid with Updated Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            {/* Recipe Image */}
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
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">Rating:</span>
                <Rating
                  style={{ maxWidth: 60 }}
                  value={recipe.ratings}
                  readOnly
                  halfFillMode="svg"
                />
              </p>

              <p className="text-sm">Serves: {recipe.servings}</p>
              <p className="text-sm">
                Author:{" "}
                {recipe.author ? (
                  <a
                    href={`/author/${recipe.author.fullName}`}
                    className="text-black"
                  >
                    {recipe.author.fullName}
                  </a>
                ) : (
                  "Unknown Author"
                )}
              </p>
              <button className="btn bg-gray-100 py-1 px-3 text-xs rounded-full mt-2 w-28 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                Save Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Recipes Found Message */}
      {filteredRecipes.length === 0 && (
        <p className="text-center mt-6">
          No recipes found matching the criteria.
        </p>
      )}
    </div>
  );
};

export default AllRecipesPage;
