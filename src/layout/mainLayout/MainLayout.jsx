import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../../sharedComponents/footer/Footer";
import Navbar from "../../sharedComponents/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
