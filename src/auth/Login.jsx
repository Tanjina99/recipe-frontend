import React from "react";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import login from "../../public/login.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // Formik Configuration with Yup validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signin",
          values,
          { withCredentials: true }
        );

        if (response.data.status === "Success") {
          toast.success("Login Successful!");
          navigate("/");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        console.error("Error in login request:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-100 p-4">
      <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-lg rounded-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-6">
          <div className="w-64 h-64 lg:w-80 lg:h-80">
            <Lottie animationData={login} loop={true} />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-serif text-center text-black mb-6">
            Login
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full p-2 border rounded-lg ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full p-2 border rounded-lg ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="btn btn-outline btn-info w-full py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
