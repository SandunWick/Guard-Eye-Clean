import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaUserShieldSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";

function UserManagement() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="title-center">User Management</h1> 
      <button className="tile btn-tile-add" onClick={() => navigate("/client")}>
      <GoPeople /> Client 
      </button>
      <button className="tile btn-tile-add" onClick={() => navigate("/guard")}>
      <LiaUserShieldSolid /> Guard
      </button>
    </div>
  );
}

export default UserManagement;
