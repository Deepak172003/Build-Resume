import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext"; // <-- make sure this file exists

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext); // ✅ use the right context

  return (
    <div>
      {/* Navbar with active menu */}
      <Navbar activeMenu={activeMenu} />

      {/* Page content only if user exists */}
      {user && <div className="container mx-auto pt-4 pb-4">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
