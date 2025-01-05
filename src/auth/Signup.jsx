import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Lottie from "lottie-react";
import register from "../../public/register.json";

const Signup = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      photo: "",
      address: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(
          /[a-zA-Z0-9]/,
          "Password must contain only letters and numbers"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          fullName: values.fullName,
          email: values.email,
          address: values.address,
          password: values.password,
          role: values.role,
          photo: photo,
        };

        console.log("Data being sent to server:", data);

        const response = await axios.post(
          "http://localhost:3000/api/signup",
          data
        );
        console.log("Server Response:", response);

        if (response.data.status === "Success") {
          toast.success("Account Created Successfully!");
          navigate("/login");
        } else {
          toast.error("Error occurred while signing up.");
        }
      } catch (error) {
        console.error("Error in submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-100 p-4">
      <div className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-lg rounded-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-6">
          <div className="w-64 h-64 lg:w-80 lg:h-80">
            <Lottie animationData={register} loop={true} />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-serif text-center text-black mb-6">
            Sign Up
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter you FullName"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
              )}
            </div>

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
                placeholder="Enter you Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="block text-black text-sm font-semibold mb-2">
                Photo
              </label>
              <input
                type="text"
                placeholder="Paste your photo URL"
                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-md text-black"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                name="photo"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your Address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
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
                placeholder="Enter your Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Password must match"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="btn btn-outline btn-info w-full py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
