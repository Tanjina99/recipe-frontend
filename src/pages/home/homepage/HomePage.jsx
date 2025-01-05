import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <section className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/images/cookingvideo.mp4" type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl mb-4 font-serif">
            Share Your Recipes with the World
          </h1>

          <p className="text-lg md:text-2xl mb-6 max-w-2xl font-mono">
            Explore, Share, and Enjoy Recipes from Around the Globe
          </p>

          <Link to="/recipes">
            <button className="btn bg-gray-100 px-6 text-xl rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              Browse Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
