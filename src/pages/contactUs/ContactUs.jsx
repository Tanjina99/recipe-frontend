import React, { useRef } from "react";
import Lottie from "lottie-react";
import emailjs from "@emailjs/browser";
import contactus from "../../../public/contactus.json";
import { toast } from "sonner";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email!");
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-amber-100">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-md flex flex-col md:flex-row space-y-6 md:space-y-0 bg-gradient-to-b from-transparent to-[rgb(231,249,253)]">
        <div className="w-full md:w-1/2 flex flex-col space-y-6 order-2 md:order-1">
          <h2 className="text-3xl text-center mb-2 font-serif">
            Get in Touch with Us
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            We are here to help! If you have any questions or need assistance,
            feel free to reach out to us. We'll get back to you as soon as
            possible.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="to_subject"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn bg-gray-100 py-3 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
          <Lottie
            animationData={contactus}
            loop={true}
            className="w-full h-auto lg:w-[400px] lg:h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
