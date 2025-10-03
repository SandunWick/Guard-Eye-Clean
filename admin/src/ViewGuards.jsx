import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 

function ViewGuards() {
  const [guards, setGuards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch guards from Firestore
  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guards"));
        const guardsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuards(guardsData);
      } catch (error) {
        console.error("Error fetching guards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuards();
  }, []);

  // Filter guards based on search term (serviceNo)
  const filteredGuards = guards.filter((guard) =>
    guard.serviceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle row click to show full details
  const handleRowClick = (guard) => {
    setSelectedGuard(guard);
  };

  // Close details view
  const handleCloseDetails = () => {
    setSelectedGuard(null);
  };

  return (
    <div>
      <h1 className="title-center">Guards</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by service number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-search"
        />
      </div>

      {/* Guards List */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredGuards.length > 0 ? (
        <table className="guards-table">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Service Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuards.map((guard) => (
              <tr key={guard.id} onClick={() => handleRowClick(guard)} style={{ cursor: "pointer" }}>
              
                <td>{guard.name || "N/A"}</td>
                <td>{guard.serviceNo || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No guards found.</p>
      )}

      {/* Full Details Modal */}
      {selectedGuard && (
        <div className="details-modal" onClick={handleCloseDetails}>
          <div className="details-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseDetails}>
              X
            </button>
            <h2>Guard Details</h2>
           
            <p><strong>Name:</strong> {selectedGuard.name || "N/A"}</p>
            <p><strong>Service Number:</strong> {selectedGuard.serviceNo || "N/A"}</p>
            <p><strong>NIC Number:</strong> {selectedGuard.nicNumber || "N/A"}</p>
            <p><strong>Contact Number:</strong> {selectedGuard.contactNo || "N/A"}</p>
            <p><strong>Gender:</strong> {selectedGuard.gender || "N/A"}</p>
            <p><strong>Birthday:</strong> {selectedGuard.birthday || "N/A"}</p>
            <p><strong>Languages:</strong> {selectedGuard.languages?.join(", ") || "N/A"}</p>
            <p><strong>Religion:</strong> {selectedGuard.religion || "N/A"}</p>
            <p><strong>Wellness:</strong> {selectedGuard.fitness || "N/A"}</p>
            <p><strong>Recent Resignation:</strong> {selectedGuard.background || "N/A"}</p>
            <p><strong>Smoke Alcohol Free:</strong> {selectedGuard.smokeAlkoholFree || "N/A"}</p>
            <p><strong>Service Types:</strong> {selectedGuard.serviceType?.join(", ") || "N/A"}</p>
            <p><strong>Experience (years):</strong> {selectedGuard.experience || "N/A"}</p>
            <p><strong>Job Zone:</strong> {selectedGuard.jobZone || "N/A"}</p>
            <p><strong>Address:</strong> {selectedGuard.address || "N/A"}</p>
            <p><strong>Medical Report:</strong> {selectedGuard.medical || "N/A"}</p>
            <p><strong>Police Report:</strong> {selectedGuard.police || "N/A"}</p>
            <p><strong>Gramaniladhari Certificate:</strong> {selectedGuard.gramaniladari || "N/A"}</p>
            <p><strong>Job Count:</strong> {selectedGuard.jobCount || "N/A"}</p>
            <p><strong>Rating:</strong> {selectedGuard.rating || "N/A"}</p>
            <p><strong>OCR Verified:</strong> {selectedGuard.ocrVerified !== undefined ? (selectedGuard.ocrVerified ? "Yes" : "No") : "N/A"}</p>
            <p><strong>Manual Override:</strong> {selectedGuard.manualOverride !== undefined ? (selectedGuard.manualOverride ? "Yes" : "No") : "N/A"}</p>
            <p><strong>Is Duplicate NIC:</strong> {selectedGuard.isDuplicateNIC !== undefined ? (selectedGuard.isDuplicateNIC ? "Yes" : "No") : "N/A"}</p>
            <p><strong>Duplicate NIC Service No:</strong> {selectedGuard.duplicateNICServiceNo || "N/A"}</p>
            <p><strong>Duplicate NIC Name:</strong> {selectedGuard.duplicateNICName || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewGuards;
