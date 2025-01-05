import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const teamMembers = [
  {
    name: "John Doe",
    position: "CEO",
    image:
      "https://as2.ftcdn.net/v2/jpg/00/77/91/73/1000_F_77917361_EaOTLo6USgDgyuVFcYVqGCkhZJiZFPvK.jpg",
    bio: "Leader and visionary driving the company's success.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
  {
    name: "Jane Smith",
    position: "Marketing Manager",
    image: "https://andhrauniversityonline.in/img/thum-ma-MHRM.jpg",
    bio: "Creative marketing strategist with a passion for digital.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
  {
    name: "Alice Johnson",
    position: "Sales",
    image:
      "https://www.fredericksonpartners.com/wp-content/uploads/2021/05/blog-post-details-03-scaled.jpg",
    bio: "Sales expert with a track record of driving revenue.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
  {
    name: "Khai Hernandez",
    position: "Sales",
    image:
      "https://www.master-of-finance.org/wp-content/uploads/2020/06/Job-Profile-Bank-Manager-1536x1024.jpg",
    bio: "Sales expert with a track record of driving revenue.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
  {
    name: "Bob White",
    position: "Operations",
    image: "https://www.burr.com/assets/images-t1714761308/662.jpeg",
    bio: "Efficient operations manager focused on streamlining processes.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
  {
    name: "Jorge Gonzalez",
    position: "Operations",
    image:
      "https://img.freepik.com/premium-photo/ceo-businessman-portrait-white-background_693425-12050.jpg",
    bio: "Efficient operations manager focused on streamlining processes.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/login",
      twitter: "https://x.com/",
    },
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-10 bg-amber-100">
      <h2 className="text-3xl text-center mb-8 font-serif">Meet Our Team</h2>
      <Tabs>
        <TabList className="flex flex-wrap space-x-4 justify-center mb-6">
          <Tab
            className="py-2 px-4 text-lg font-medium cursor-pointer hover:bg-amber-200 hover:rounded-full focus:outline-none"
            selectedClassName="bg-gray-100 text-black rounded-full"
          >
            View All
          </Tab>
          <Tab
            className="py-2 px-4 text-lg font-medium cursor-pointer hover:bg-amber-200  hover:rounded-full focus:outline-none"
            selectedClassName="bg-white text-black rounded-full"
          >
            Management
          </Tab>
          <Tab
            className="py-2 px-4 text-lg font-medium cursor-pointer hover:bg-amber-200 hover:rounded-full focus:outline-none"
            selectedClassName="bg-gray-100 text-black rounded-full"
          >
            Marketing
          </Tab>
          <Tab
            className="py-2 px-4 text-lg font-medium cursor-pointer hover:bg-amber-200  hover:rounded-full focus:outline-none"
            selectedClassName="bg-gray-100 text-black rounded-full"
          >
            Sales
          </Tab>
          <Tab
            className="py-2 px-4 text-lg font-medium cursor-pointer hover:bg-amber-200  hover:rounded-full focus:outline-none"
            selectedClassName="bg-gray-100 text-black rounded-full"
          >
            Operations
          </Tab>
        </TabList>

        {/* View All Tab */}
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 rounded-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.socialLinks.linkedin}
                    className="text-amber-500"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.socialLinks.twitter}
                    className="text-amber-600"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Management Tab */}
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {teamMembers
              .filter(
                (member) =>
                  member.position.toLowerCase().includes("ceo") ||
                  member.position.toLowerCase().includes("management")
              )
              .map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 rounded-lg text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.socialLinks.linkedin}
                      className="text-blue-600"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="text-blue-600"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>

        {/* Marketing Tab */}
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {teamMembers
              .filter((member) =>
                member.position.toLowerCase().includes("marketing")
              )
              .map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 rounded-lg text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.socialLinks.linkedin}
                      className="text-blue-600"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="text-blue-600"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>

        {/* Sales Tab */}
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {teamMembers
              .filter((member) =>
                member.position.toLowerCase().includes("sales")
              )
              .map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 rounded-lg text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.socialLinks.linkedin}
                      className="text-blue-600"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="text-blue-600"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>

        {/* Operations Tab */}
        <TabPanel>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {teamMembers
              .filter((member) =>
                member.position.toLowerCase().includes("operations")
              )
              .map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-transparent to-[rgb(231,249,253)] shadow-md p-6 rounded-lg text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.socialLinks.linkedin}
                      className="text-blue-600"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="text-blue-600"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AboutUs;
