import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TopAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/author");
        const result = await response.json();
        setAuthors(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <section className="py-12 bg-amber-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">
          Top Authors
        </h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1} // Default to 1 on mobile
          breakpoints={{
            640: {
              slidesPerView: 1, // On small screens, show 1 slide
            },
            768: {
              slidesPerView: 2, // On medium screens, show 2 slides
            },
            1024: {
              slidesPerView: 3, // On larger screens, show 3 slides
            },
          }}
          loop={true}
          className="mb-8"
        >
          {authors.slice(0, 6).map((author) => (
            <SwiperSlide key={author._id}>
              <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 flex flex-col items-center rounded-lg">
                <img
                  src={author.photo}
                  alt={author.fullName}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold text-amber-500 mt-4 mb-2">
                  {author.fullName}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <a
          href="/authors"
          className="btn bg-gray-100 px-6 py-3 rounded-full mt-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          Show All Authors
        </a>
      </div>
    </section>
  );
};

export default TopAuthors;
