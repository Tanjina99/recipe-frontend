import React from "react";
import { Link } from "react-router-dom";

const LearnMorePage = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-14 text-center font-serif">
          Learn More About Our Recipe
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex-1 max-w-md">
            <img
              src="https://ikkansushi.com/wp-content/uploads/2023/04/chef2.png"
              alt="Recipe Image"
              className="w-72 h-96 rounded-lg bg-amber-100"
            />
          </div>

          <div className="flex-1 max-w-lg text-center md:text-left">
            <h3 className="text-3xl text-gray-800 mb-4 font-thin">
              Delicious and Easy Recipe
            </h3>
            <p className="text-gray-600 mb-6">
              Discover our amazing recipe, crafted with fresh ingredients and
              simple steps. Whether you're a beginner or a seasoned chef, this
              recipe will make your meal time special.
            </p>

            <Link
              to="/learn-more"
              className=" btn bg-gray-100 px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMorePage;
