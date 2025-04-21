import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy house data (same as in HouseDetail.js)
const houseData = {
  "1": {
    name: "Spacious House Near Campus",
    location: "123 College Ave, New Brunswick, NJ",
    amenities: ["4 Bedrooms", "2 Bathrooms", "Kitchen", "Laundry", "Parking"],
    reviews: [
      { user: "Student A", rating: 5, comment: "Great place to live!" },
      { user: "Student B", rating: 4, comment: "Close to everything." },
    ],
    image: require("./images/house.jpg"),
  },
  "2": {
    name: "Cozy Apartment",
    location: "456 Hamilton St, Highland Park, NJ",
    amenities: ["2 Bedrooms", "1 Bathroom", "Kitchen", "Laundry"],
    reviews: [
      { user: "Resident X", rating: 4, comment: "Nice and quiet." },
    ],
    image: require("./images/house.jpg"),
  },
  "3": {
    name: "Townhouse with Yard",
    location: "789 Easton Ave, Somerset, NJ",
    amenities: ["3 Bedrooms", "2.5 Bathrooms", "Kitchen", "Laundry", "Yard"],
    reviews: [],
    image: require("./images/house.jpg"),
  },
  "4": {
    name: "Studio Apartment",
    location: "101 George St, New Brunswick, NJ",
    amenities: ["1 Bedroom", "1 Bathroom", "Kitchen"],
    reviews: [
      { user: "Solo Traveler", rating: 5, comment: "Perfect for one person." },
    ],
    image: require("./images/house.jpg"),
  },
  "5": {
    name: "Large House for Groups",
    location: "222 Highland Ave, Highland Park, NJ",
    amenities: ["6 Bedrooms", "3 Bathrooms", "Large Kitchen", "Laundry", "Parking"],
    reviews: [
      { user: "Group Alpha", rating: 5, comment: "Plenty of space!" },
    ],
    image: require("./images/house.jpg"),
  },
  "6": {
    name: "Affordable Housing Option",
    location: "333 Union St, New Brunswick, NJ",
    amenities: ["2 Bedrooms", "1 Bathroom", "Kitchen"],
    reviews: [
      { user: "Budget Conscious", rating: 4, comment: "Good value for money." },
    ],
    image: require("./images/house.jpg"),
  },
};

function SavedHousesPage() {
  // In a real application, you would likely fetch saved houses from a user's profile or local storage.
  // For this example, we'll assume the savedHouses array is stored in localStorage.
  const [savedHouseIds, setSavedHouseIds] = useState(() => {
    const storedSavedHouses = localStorage.getItem("savedHouses");
    return storedSavedHouses ? JSON.parse(storedSavedHouses) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedHouses", JSON.stringify(savedHouseIds));
  }, [savedHouseIds]);

  const savedHouses = savedHouseIds.map(id => houseData[id]).filter(house => house !== undefined);

  const handleUnsave = (houseId) => {
    setSavedHouseIds(prevIds => prevIds.filter(id => id !== houseId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Houses</h2>
      {savedHouses.length === 0 ? (
        <p>No houses saved yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {savedHouses.map(house => (
            <div key={house.name} style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <img src={house.image} alt={house.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ marginBottom: "8px" }}>{house.name}</h3>
                <p style={{ marginBottom: "8px" }}><strong>Location:</strong> {house.location}</p>
                <Link to={`/house/${Object.keys(houseData).find(key => houseData[key] === house)}`} style={{ display: "block", marginBottom: "10px", color: "blue", textDecoration: "none" }}>
                  View Details
                </Link>
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleUnsave(Object.keys(houseData).find(key => houseData[key] === house))}
                >
                  Unsave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/" style={{ display: "block", marginTop: "20px", color: "blue", textDecoration: "none" }}>
        Back to Home
      </Link>
    </div>
  );
}

export default SavedHousesPage;