import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import AuthProvider from "../utils/authProvider/AuthProvider";

const SingleRecipe = () => {
  const { user } = AuthProvider();
  console.log("user from single resipe", user);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [newReview, setNewReview] = useState({
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
  }, [id, refresh]);

  const handleAddReview = (e) => {
    e.preventDefault();

    // console.log(newReview.rating, newReview.reviewText);

    if (!newReview.rating || !newReview.reviewText) {
      toast.error("Please fill out all fields.");
      return;
    }

    const reviewData = {
      rating: newReview.rating,
      reviewText: newReview.reviewText,
      reviewerId: user.id,
    };
    console.log(reviewData);

    axios
      .patch(`http://localhost:3000/api/recipe/add-review/${id}`, reviewData)
      .then((response) => {
        setReviews([...reviews, response.data.review]);

        setNewReview({ rating: 0, reviewText: "" });
        setRefresh((prev) => prev + 1);
        toast.success("Review added successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(
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

          <div className="reviews-section">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-item my-4 p-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={review.reviewerId.photo}
                      alt={review.reviewerId.fullName}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="font-semibold ml-2">
                      {review.reviewerId.fullName}
                    </p>{" "}
                    <div className="flex items-center ml-2">
                      <Rating
                        value={review.rating}
                        readOnly
                        style={{ maxWidth: 60 }}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.reviewText}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
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
            <div className="flex items-center space-x-4">
              <label className="text-lg">Rating:</label>
              <Rating
                value={newReview.rating}
                onChange={(value) =>
                  setNewReview((prev) => ({ ...prev, rating: value }))
                }
                style={{ maxWidth: 80 }}
                halfFillMode="box"
              />
            </div>

            <textarea
              name="reviewText"
              value={newReview.reviewText}
              onChange={(e) =>
                setNewReview((prev) => ({
                  ...prev,
                  reviewText: e.target.value,
                }))
              }
              placeholder="Your Review"
              className="w-full p-2 border rounded-md"
              rows="3"
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
