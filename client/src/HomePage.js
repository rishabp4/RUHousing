import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { houseData } from "./HouseDetail";
import logo from "./images/RuLogo.png";
import rutgersR from "./images/Rutgers-R.png";
import avatar from "./images/default_avatar.png";
import collegeAveBg from "./images/college_ave_background.png";

function HomePage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [savedHouses, setSavedHouses] = useState([]);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleHouseClick = (id) => {
    navigate(`/house/${id}`); 
  };

  const handleSaveHouse = (houseId) => {
    const storedSavedHouses = localStorage.getItem("savedHouses");
    const currentSavedHouses = storedSavedHouses ? JSON.parse(storedSavedHouses) : [];

    if (!currentSavedHouses.includes(houseId)) {
      localStorage.setItem("savedHouses", JSON.stringify([...currentSavedHouses, houseId]));
      setSavedHouses([...currentSavedHouses, houseId]); // Update local state for immediate UI feedback
      alert(`House #${houseId} saved!`);
    } else {
      const updatedSavedHouses = currentSavedHouses.filter(id => id !== houseId);
      localStorage.setItem("savedHouses", JSON.stringify(updatedSavedHouses));
      setSavedHouses(updatedSavedHouses); // Update local state
      alert(`House #${houseId} unsaved!`);
    }
  };

  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#585757",
      padding: "15px 20px",
      color: "white",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
    },
    rutgersR: {
      height: "60px",
      width: "auto",
      marginRight: "15px",
    },
    logo: {
      height: "80px",
      width: "auto",
      marginRight: "20px",
    },
    first: {
      fontSize: "27px",
      fontFamily: "Myriad Pro, Arial, sans-serif",
      color: "rgb(204, 146, 60)",
      fontWeight: "bold",
    },
    avatar: {
      height: "60px",
      width: "60px",
      borderRadius: "50%",
      cursor: "pointer",
    },
    navbar: {
      display: "flex",
      backgroundColor: "#4CAF50",
      padding: "10px 30px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tabsLeft: {
      display: "flex",
      gap: "25px", // Increased gap for better spacing
    },
    tabButton: {
      backgroundColor: "#66BB6A",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    searchSection: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginRight: "10px", // slight shift to the right
    },
    searchInput: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
      width: "180px",
    },
    searchButton: {
      padding: "6px 14px",
      backgroundColor: "#388E3C",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <div style={styles.header}>
        <div style={styles.leftSection}>
          <img src={rutgersR} alt="Rutgers R" style={styles.rutgersR} />
          <img src={logo} alt="RU Housing Logo" style={styles.logo} />
          <h1 style={styles.first}>RU Housing</h1>
        </div>
        <h1
          style={{
            textAlign: "center",
            flex: 1,
            color: "#ADD8E6",
            marginLeft: "-300px",
            fontWeight: "bold",
          }}
        >

        </h1>
        <Link to="/profile">
    <img src={avatar} alt="User Avatar" style={styles.avatar} />
  </Link>
</div>

      {/* Green Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.tabsLeft}>
          <button style={styles.tabButton}>Home</button>
          <Link to="/saved-houses" style={{ textDecoration: 'none' }}> {/* Link to Saved Houses */}
          <button style={styles.tabButton}>Saved Houses and Details</button>
          </Link>
          <Link to="/find-roommates" style={styles.tabButton}>
            Find My Roommates
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
          <button style={styles.tabButton}>Profile</button>
          </Link>
        </div>

        <div style={styles.searchSection}>
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>
      </div>
      {/* Background Area with Houses (future section) */}
      <div
        style={{
          backgroundImage: `url(${collegeAveBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 130px)",
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Main Content Window */}
        <div
          style={{
            backgroundColor: "#d3d3d3", // Changed background color to light gray
            borderRadius: "12px",
            padding: "30px",
            width: "90%",
            maxWidth: "1200px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Top of the housing window: search/filter */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#2c3e50", // Dark blue-ish background
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Search for houses..."
              style={{
                padding: "8px 12px",
                width: "250px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <div style={{ position: "relative" }}>
              <button
                onClick={toggleDropdown}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Filter ⌄
              </button>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                    padding: "12px",
                    zIndex: 1000,
                    width: "200px",
                  }}
                >
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    <strong>Price Range:</strong>
                    <input
                      type="text"
                      placeholder="e.g. 1000-1500"
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    <strong>Bedrooms:</strong>
                    <select
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginTop: "5px",
                      }}
                    >
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </label>
                 {/* Add Amenities Filter */}
          <label style={{ display: "block", marginBottom: "10px" }}>
            <strong>Amenities:</strong>
            <div>
              {/* Dynamically generate checkboxes based on available amenities */}
              {[...new Set(Object.values(houseData).flatMap(house => house.amenities))].map(amenity => (
                <label key={amenity} style={{ display: "block", marginLeft: "10px" }}>
                  <input type="checkbox" name="amenities" value={amenity} style={{ marginRight: "5px" }} />
                  {amenity}
                </label>
              ))}
            </div>
          </label>

          {/* Add Location Filter */}
          <label style={{ display: "block", marginBottom: "10px" }}>
            <strong>Location:</strong>
            <select
              style={{
                width: "100%",
                padding: "6px",
                marginTop: "5px",
              }}
            >
              <option>Any</option>
              {/* Dynamically generate options based on available locations */}
              {[...new Set(Object.values(houseData).map(house => house.location.split(', ')[1]))].map(location => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </label>
                  <button
                    style={{
                      width: "100%",
                      marginTop: "8px",
                      padding: "8px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Filters applied!")}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid of house cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when saving
                  handleSaveHouse(i + 1);
                }}
              >
                <img
                  src={require("./images/house.jpg")}
                  alt={`House ${i + 1}`}
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <p style={{ margin: "8px 0", fontWeight: "bold" }}>
                    House #{i + 1}
                  </p>
                  <button
                    style={{
                      padding: "5px 12px",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      cursor: "pointer",
                      color: "#e91e63",
                      fontWeight: "bold",
                    }}
                  >
                     ♥ {localStorage.getItem("savedHouses") && JSON.parse(localStorage.getItem("savedHouses")).includes(i + 1) ? "Unsave" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}



export default HomePage;
