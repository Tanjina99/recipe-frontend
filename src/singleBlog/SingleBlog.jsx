import React, { useEffect, useState } from "react";
import { FaFileAlt, FaCommentAlt } from "react-icons/fa";

import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    fullName: "",
    email: "",
    text: "",
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blog/${id}`);
        const data = await response.json();
        setBlogData(data.data);
        setComments(data.data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newCommentData = {
      ...newComment,
      date: new Date(),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
        }
      );
      const data = await response.json();
      setComments([...comments, data.comment]); // Add the new comment to the comments state
      setNewComment({ name: "", text: "" }); // Reset the form
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-6 px-4 py-2 bg-white shadow-lg rounded-[10px] max-w-[800px] mx-auto text-center flex items-center justify-center">
        <FaFileAlt className="mr-4 text-red-500" />
        {blogData.title}
      </h1>

      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl border border-gray-200">
        <div className="author-info mb-4 flex items-center">
          <p className="text-sm mr-2">By: {blogData.author.fullName}</p>
          <p className="text-sm ml-8">
            Date:{" "}
            {new Date(blogData.postDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <hr className="mb-4" />

        <div className="blog-image mb-6 flex justify-center">
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>

        <div className="blog-content mb-6">
          <p>{blogData.content}</p>
        </div>

        <div className="social-share mb-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/blog/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Share on Facebook
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 px-4 py-2 bg-white shadow-lg border-8 rounded-[10px] max-w-[700px] mx-auto flex items-center">
          <FaCommentAlt className="mr-4 text-red-500" />
          Comments
        </h2>
        <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl max-w-2xl mx-auto p-6 mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="comment border-b border-gray-300 pb-4 mb-4"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <p className="font-semibold">{comment.commenterName}</p>
                  <p className="text-sm text-red-500">
                    Date:{" "}
                    {new Date(comment.submissionDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <p className="text-gray-700 mt-2">{comment.commentText}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      {/* Leave a Comment Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 px-4 py-2 bg-white shadow-lg border-8 rounded-[10px] max-w-[700px] mx-auto flex items-center">
          <FaCommentAlt className="mr-4 text-red-500" />
          Leave a Comment
        </h2>

        <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md hover:shadow-xl max-w-2xl mx-auto p-6 rounded-lg border mt-4">
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="fullName"
                  value={newComment.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="w-1/2">
                <input
                  type="email"
                  name="email"
                  value={newComment.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <textarea
                name="text"
                value={newComment.text}
                onChange={handleInputChange}
                placeholder="Your comment"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline btn-info shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full py-2 rounded-lg"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 flex items-center flex-col text-center">
        {blogData.author ? (
          <>
            <p className="font-semibold">{blogData.author.fullName}</p>
            <a
              href={`/author/${blogData.author._id}`}
              className="text-blue-500 hover:underline mt-2"
            >
              View Author's Profile
            </a>
          </>
        ) : (
          <p className="text-gray-500">Unknown Author</p>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
