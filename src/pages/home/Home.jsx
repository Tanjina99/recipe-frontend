import React from "react";
import HomePage from "./homepage/HomePage";
import LearMore from "./learnMore/LearMore";
import LatestRecipe from "./latestRecipe/LatestRecipe";
import Authors from "./author/Authors";
import SpecialOffer from "./specialOffer/SpecialOffer";

const Home = () => {
  return (
    <div>
      <HomePage />
      <LatestRecipe />
      <Authors />
      <LearMore />
      <SpecialOffer />
    </div>
  );
};

export default Home;
