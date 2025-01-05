import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SpecialOffer = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    // Fetch the dishes from API
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        const result = await response.json();
        const dishesArray = result.data || [];
        setDishes(dishesArray.slice(-3)); // Get the latest 3 dishes
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <section className="py-10 px-6 bg-amber-100">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-black mb-4 font-serif">
            Limited-Time Special Offers
          </h2>
          <p className="text-lg text-gray-600">
            Treat yourself with our carefully curated recipes and exclusive
            deals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md rounded-lg overflow-hidden flex justify-center items-center p-6"
            data-aos="fade-right"
          >
            <img
              src="https://png.pngtree.com/png-clipart/20230303/original/pngtree-special-offer-coming-soon-banner-png-image_8971329.png"
              alt="Special Offer Banner"
              className="w-80 h-80 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6" data-aos="fade-left">
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="flex items-center bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md rounded-lg p-6 hover:shadow-lg transition "
              >
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-black">
                    {dish.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Servings: {dish.servings}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Steps: {dish.method.length}
                  </p>
                </div>
              </div>
            ))}
            {!dishes.length && (
              <p className="text-gray-500 text-center">Loading recipes...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
