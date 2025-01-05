import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    reviewText: "",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        console.error("ID is undefined, aborting request");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        console.log("Response Data:", response.data);

        if (response.data && response.data.data) {
          setRecipe(response.data.data);
          setReviews(response.data.data.reviews);
        } else {
          console.error("No recipe data returned for ID:", id);
          setRecipe(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.reviewText) {
      alert("Please fill out all fields.");
      return;
    }

    axios
      .post(`http://localhost:3000/api/recipes/${id}/reviews`, newReview)
      .then((response) => {
        setReviews([...reviews, response.data.review]);
        setNewReview({ name: "", rating: 0, reviewText: "" });
        alert("Review added!");
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    alert(
      isFavorite
        ? "Recipe removed from favorites!"
        : "Recipe added to favorites!"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{recipe.title}</h1>
      <div className="flex justify-center mt-8">
        <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl w-full max-w-4xl p-6">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">How to Make</h2>
            <ol className="list-decimal pl-6 mt-4 space-y-2">
              {recipe.method.map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ol>

            {/* Ingredients */}
            <h2 className="text-2xl font-semibold mt-8">Ingredients</h2>
            <ul className="list-disc pl-6 mt-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-lg ">
                  {ingredient.name}{" "}
                  {ingredient.quantity && `(${ingredient.quantity})`}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between p-4 border-b w-full rounded-md relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] border-t border-gray-300"></div>

              <button
                onClick={handleFavorite}
                className="flex items-center space-x-2 text-lg text-gray-800"
              >
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300">
                  {isFavorite ? (
                    <AiFillHeart className="text-red-600 w-5 h-5 hover:text-red-600" />
                  ) : (
                    <AiOutlineHeart className="text-gray-600 w-5 h-5 hover:text-red-600" />
                  )}
                </div>
                <span className="hover:text-red-600">
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </button>

              {/* Servings */}
              <div className="flex items-center text-lg space-x-2 hover:text-red-600 cursor-pointer">
                <p>
                  <strong>Servings</strong> {recipe.servings}
                </p>
                <IoIosPeople className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center">
            {recipe.author && recipe.author.photo ? (
              <img
                src={recipe.author.photo}
                alt={recipe.author.fullName}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div> // Placeholder if no photo exists
            )}
            <div>
              {recipe.author ? (
                <>
                  <p className="font-semibold">{recipe.author.fullName}</p>
                  <a
                    href={`/author/${recipe.author._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Author's Profile
                  </a>
                </>
              ) : (
                <p className="text-gray-500">Unknown Author</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl w-full max-w-4xl p-6">
          <div className="flex items-center mt-8">
            <FaRegStar className="text-red-500 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>
          </div>

          <div className="mt-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <div className="flex items-center ml-8">
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-red-500 text-sm ml-6">
                    {review.reviewDate &&
                    !isNaN(new Date(review.reviewDate).getTime())
                      ? `Date: ${new Date(review.reviewDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}`
                      : "Invalid Date"}
                  </p>
                </div>
                <div className="flex items-center ml-6">
                  <p className="font-semibold">{review.name}</p>
                  <div className="ml-2 text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i} className="text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-2 ml-8">{review.reviewText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl w-full max-w-4xl p-6">
          <div className="flex items-center mt-8">
            <FaRegStar className="text-red-500 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Add a Review</h2>
          </div>

          <form onSubmit={handleAddReview} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleReviewChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded-md"
            />
            <div className="flex items-center space-x-4">
              <label className="text-lg">Rating:</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="p-2 border rounded-md"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} {star === 1 ? "star" : "stars"}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="reviewText"
              value={newReview.reviewText}
              onChange={handleReviewChange}
              placeholder="Your Review"
              className="w-full p-2 border rounded-md"
              rows="4"
            />
            <button
              type="submit"
              className="btn btn-outline btn-info shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out px-6 py-2 rounded-md "
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
