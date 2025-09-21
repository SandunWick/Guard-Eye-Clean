import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaUserPlusSolid } from "react-icons/lia";
import { RiUserSearchLine } from "react-icons/ri";

function ClientManagement() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="title-center">Client Management</h1>
      <button className="tile btn-tile-add" onClick={() => navigate("/addUser")}>
        <LiaUserPlusSolid />Add
      </button>
      <button className="tile btn-tile-add" onClick={() => navigate("/viewUsers")}>
        <RiUserSearchLine />View
      </button>
    </div>
  );
}

export default ClientManagement;
