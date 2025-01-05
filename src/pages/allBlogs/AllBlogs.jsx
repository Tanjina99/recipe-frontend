import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFolderOpen } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const categories = ["Tech", "Food", "Lifestyle", "Health"];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Build query string based on search and categories
        const query = new URLSearchParams();

        if (searchInput) {
          query.append("search", searchInput);
        }

        if (selectedCategories.length > 0) {
          query.append("category", selectedCategories.join(","));
        }

        const response = await axios.get(
          `http://localhost:3000/api/blog?${query.toString()}`
        );
        const blogData = response.data.data;

        if (Array.isArray(blogData)) {
          setBlogs(blogData);
          setFilteredBlogs(blogData.slice(0, visibleBlogs));
        } else {
          console.error("API data is not an array:", blogData);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [searchInput, selectedCategories, visibleBlogs]);

  // Handle search functionality
  const handleSearch = () => {
    setVisibleBlogs(6);
  };

  // Handle category filtering
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs(visibleBlogs + 6);
    if (visibleBlogs + 6 >= blogs.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="container mx-auto p-6 py-10 bg-amber-100">
      <h1 className="text-3xl sm:text-3xl text-center text-gray-800 mb-16 font-serif">
        Insights & Stories from Our Blog
      </h1>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
        {" "}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl transform hover:scale-105 transition-all p-4 w-full max-w-2xl mx-auto"
            >
              <div className="flex">
                <figure className="flex-1 overflow-hidden rounded-lg">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-44 h-48 object-cover rounded-md"
                  />
                </figure>
                <div className="flex-1 pl-4 flex flex-col justify-center">
                  <h3 className="text-lg mb-4">{blog.title}</h3>
                  <div className="flex space-x-4 text-sm text-gray-600 mb-2">
                    <p className="whitespace-nowrap">
                      Author:{" "}
                      <Link
                        to={`/author/${blog.author._id}`}
                        className="text-black font-semibold"
                      >
                        {blog.author.fullName}
                      </Link>
                    </p>
                    <p className="whitespace-nowrap">
                      Category: {blog.category}
                    </p>
                    <p className="whitespace-nowrap">
                      Posted Date:{" "}
                      {new Date(blog.postDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4 space-y-2">
          {" "}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2 text-center">
              Search Blogs
              <span className="text-gray-600 hover:text-indigo-500 transition-colors duration-300">
                <CiSearch />
              </span>
            </h2>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search blogs by title, keyword, or author"
              className="input input-bordered w-full px-4 py-3 rounded-lg shadow-md focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="btn bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full mt-4"
            >
              Search
            </button>
          </div>
          {/* Categories Card */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              Categories
              <span>
                <FaFolderOpen className="text-red-600" />
              </span>
            </h2>

            <hr className="w-1/2 mx-auto border-t-2 border-gray-200 my-2" />

            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="checkbox checkbox-sm"
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* No Blogs Found */}
      {filteredBlogs.length === 0 && (
        <p className="text-center mt-6">
          No blogs found matching the criteria.
        </p>
      )}

      {/* Load More Button under Blog Cards */}
      {hasMore && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={loadMoreBlogs}
            className="btn bg-gray-100 py-2 px-4 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
