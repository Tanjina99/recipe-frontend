import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout/MainLayout";
import "./index.css";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import Author from "./pages/author/Author";
import AllRecipesPage from "./pages/allRecipe/AllRecipe";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import ContactUs from "./pages/contactUs/ContactUs";
import SingleRecipe from "./singleRecipe/SingleRecipe";
import SingleBlog from "./singleBlog/SingleBlog";
import { Toaster } from "sonner";
import ErrorPage from "./errorPage/ErrorPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AuthorRecipesPage from "./pages/authorRecipesandBlog/AuthorRecipePage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<AllRecipesPage />} />
          <Route path="blog" element={<AllBlogs />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="author" element={<Author />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="single-recipe/:id" element={<SingleRecipe />} />
          <Route path="single-blog/:id" element={<SingleBlog />} />
          <Route path="/author-recipes/:id" element={<AuthorRecipesPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
