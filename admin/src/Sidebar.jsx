import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { PiUserSwitchLight } from "react-icons/pi";
import "./layout.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/");
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <button className="tile btn-tile" onClick={() => navigate("/dashboard")}>
        <MdOutlineDashboard />Dashboard
      </button>
      <button className="tile btn-tile" onClick={() => navigate("/user-management")}>
        <PiUserSwitchLight />Users
      </button>
      <h3 className="sidebar-title-2">Operations</h3>
      <button className="tile btn-tile" onClick={() => navigate("/ongoing")}>
        In Progress
      </button>
      <button className="tile btn-tile" onClick={() => navigate("/scheduled")}>
        Scheduled
      </button>
      <button className="tile btn-tile" onClick={() => navigate("/completed")}>
        Completed
      </button>
      <h3 className="sidebar-title-3"></h3>
      <button className="tile btn-tile" onClick={() => navigate("/analytics")}>
        <TbBrandGoogleAnalytics /> Analytics
      </button>
      <button className="tile btn-tile" onClick={() => navigate("/payments")}>
        <MdPayment />Payment
      </button>
      <button className="tile btn-tile" onClick={() => navigate("/settings")}>
        <IoSettingsOutline />Settings
      </button>
      <h3 className="sidebar-title-3"></h3>
      <button className="tile btn-tile logout" onClick={handleSignOut}>
        Sign Out <FaSignOutAlt />
      </button>
    </aside>
  );
}

export default Sidebar;
