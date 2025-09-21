import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaUserPlusSolid } from "react-icons/lia";
import { RiUserSearchLine } from "react-icons/ri";

function GuardManagement() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="title-center">Guard Management</h1>
      <button className="tile btn-tile-add" onClick={() => navigate("/addGuard")}>
        <LiaUserPlusSolid />Add 
      </button>
      <button className="tile btn-tile-add" onClick={() => navigate("/viewGuards")}>
        <RiUserSearchLine />View 
      </button>
    </div>
  );
}

export default GuardManagement;
