import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { SiSpacex } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-16 text-base-content">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <h6 className="footer-title text-xl mb-4 text-black">
              Quick Links
            </h6>
            <nav>
              <Link to="/" className="link link-hover block mb-2">
                Home
              </Link>
              <Link to="/recipes" className="link link-hover block mb-2">
                Recipes
              </Link>
              <Link to="/blog" className="link link-hover block mb-2">
                Blog
              </Link>
              <Link to="/about-us" className="link link-hover block mb-2">
                About Us
              </Link>
              <Link to="/contact" className="link link-hover block mb-2">
                Contact Us
              </Link>
              <Link to="/login" className="link link-hover block mb-2">
                Login
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h6 className="footer-title text-xl mb-4 text-black">Follow Us</h6>
            <div className="flex justify-center space-x-4 text-lg">
              <a
                href="https://www.facebook.com"
                className="text-blue-600 text-3xl hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiFacebook />
              </a>
              <a
                href="https://x.com/?lang-en="
                className="text-blue-400 text-3xl hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiSpacex />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-pink-500 text-3xl hover:text-pink-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/"
                className="text-red-600 text-3xl hover:text-red-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiYoutube />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h6 className="footer-title text-xl mb-4 text-black">Contact Us</h6>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:Sizzle&Spice@gmail.com"
                className="link link-hover"
              >
                Sizzle & Spice@gmail.com
              </a>
            </p>
            <p className="mb-2">
              Phone:{" "}
              <a href="tel:+1234567890" className="link link-hover">
                +1 (234) 567-890
              </a>
            </p>
            <p>Address: 123 Main Street, Anytown, USA</p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h6 className="footer-title text-xl font-bold mb-4 text-black text-center sm:text-left">
              Newsletter
            </h6>
            <form className="flex flex-col items-center">
              <fieldset className="form-control w-full max-w-sm">
                <label className="label flex justify-center -mt-4">
                  <span className="label-text text-lg text-black text-left w-full">
                    Enter your email address
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row items-center w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered mb-2 sm:mb-0 sm:mr-2 w-full sm:w-64 md:w-72 lg:w-60 text-md bg-white text-black rounded-lg shadow-md focus:outline-none"
                  />
                  <button className="w-full sm:w-auto text-sm btn bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
