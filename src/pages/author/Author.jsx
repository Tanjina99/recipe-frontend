import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Author = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [displayedAuthors, setDisplayedAuthors] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/author");
        if (response.data.status === "Success") {
          const authorList = response.data.data;
          setAuthors(authorList);
          setDisplayedAuthors(authorList.slice(0, visibleCount));
        } else {
          console.error("Error fetching authors: ", response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthors();
  }, [visibleCount]);

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //Handle search
  const handleSearch = () => {
    console.log("Search term: ", searchTerm);
  };

  // Load more authors when button is clicked
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  // Filter authors based on the search term
  const filteredAuthors = authors.filter((author) =>
    author.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to All Recipes for a given author
  const handleAllRecipesClick = (authorId) => {
    navigate(`/recipes?author=${authorId}`);
  };

  // Navigate to All Blogs for a given author
  const handleAllBlogsClick = (authorId) => {
    navigate(`/blogs?author=${authorId}`);
  };

  return (
    <div className="container mx-auto p-8 bg-amber-100">
      <h1 className="text-2xl sm:text-3xl text-center text-black mb-6 font-serif">
        Meet Our Talented Authors
      </h1>
      <div className="flex justify-center items-center mb-6">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search authors..."
            className="border rounded-lg shadow-md px-4 py-2 w-full focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearch}
            className="btn bg-gray-100 rounded-md px-4 py-2 ml-2 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredAuthors.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No authors found</p>
        ) : (
          filteredAuthors.map((author, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img
                src={author.photo}
                alt={author.fullName}
                className="rounded-full w-32 h-32 mx-auto object-cover"
              />
              <h3 className="text-2xl capitalize font-semibold text-center mt-4 text-gray-800">
                {author.fullName}
              </h3>
              <p className="text-center text-gray-500 mt-2">{author.email}</p>
              <div className="mt-6 flex justify-center gap-2">
                <Link to={`/author-recipes/${author._id}`}>
                  <button className="btn bg-gray-100 px-2 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    All Recipes
                  </button>
                </Link>

                <button
                  className="btn bg-gray-100 px-3 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                  onClick={() => handleAllBlogsClick(author._id)}
                >
                  All Blogs
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredAuthors.length > displayedAuthors.length && (
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Author;
