import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./images/RuLogo.png";
import rutgersR from "./images/Rutgers-R.png";
import avatar from "./images/default_avatar.png";
import collegeAveBg from "./images/college_ave_background.png";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SavedHousesDetailModel from "./SavedHousesDetailModel";

function SavedHousesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [photoUrl, setPhotoUrl] = useState(avatar);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchSavedHouses = async () => {
      const userId = localStorage.getItem("userId");
      let config;
      const userSavedHouses = await axios
        .get(`http://localhost:5002/api/house/${userId}`)
        .then((response) => {
          setProperties(response.data.props || []);
        })
        .catch((error) => {
          console.error("Error fetching houses:", error);
        });
    };

    fetchSavedHouses();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setUserId(user.uid);
        setPhotoUrl(
          `http://localhost:5002/api/profile-photo/${user.uid}?t=${Date.now()}`
        );
      } else {
        setUserId(null);
        setPhotoUrl(avatar);
      }
    });
    return () => unsubscribe();
  }, []);

  // Home‑button behaviour: go to /home or refresh if already there
  const handleHomeClick = () => {
    if (location.pathname === "/home") {
      navigate(0); // full reload of /home
    } else {
      navigate("/home");
    }
  };

  // Saved-Houses button behaviour (refresh if already here)
  const handleSavedClick = () => {
    if (location.pathname === "/saved-houses") {
      navigate(0); // reload page
    } else {
      navigate("/saved-houses");
    }
  };

  const openModal = (house) => {
    setSelectedHouse(house);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHouse(null);
  };

  const isHouseAvailable = (house) => {
    return house.available;
  };

  // Helper function to generate consistent star ratings
  const getHouseRating = (house) => {
    return house.rating;
  };

  const handleUnSaveHouse = async (houseId) => {
    // 1. get the userId from local storage
    const userId = localStorage.getItem("userId");

    // 2.) delete the house
    try {
      const response = await axios.delete(
        `http://localhost:5002/api/house/${houseId}`
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("An unexpected error occurred while deleting the house.");
      }
    }
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#585757",
          padding: "15px 20px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={rutgersR}
            alt="Rutgers R"
            style={{ height: "60px", marginRight: "15px" }}
          />
          <img
            src={logo}
            alt="RU Housing Logo"
            style={{ height: "80px", marginRight: "20px" }}
          />
          <h1
            style={{
              fontSize: "27px",
              color: "rgb(204, 146, 60)",
              fontWeight: "bold",
            }}
          >
            RU Housing
          </h1>
        </div>
        <Link to="/profile">
          <img
            src={photoUrl /* or avatar */}
            alt="User Avatar"
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              background: "#fafafa",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = avatar;
            }}
          />
        </Link>
      </div>

      {/* Navbar */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#4CAF50",
          padding: "10px 30px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "25px" }}>
          <button
            className="home-button"
            style={{
              backgroundColor: "#66BB6A",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className="saved-houses-button"
            style={{
              backgroundColor: "#66BB6A",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={handleSavedClick}
          >
            Saved Houses
          </button>
          <Link to="/matched-profiles">
            {" "}
            {/* Updated Link here */}
            <button
              className="roommates-button"
              style={{
                backgroundColor: "#66BB6A",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                fontWeight: "bold",
              }}
            >
              My Roommates
            </button>
          </Link>
          <Link to="/profile">
            <button
              className="profile-button"
              style={{
                backgroundColor: "#66BB6A",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Profile
            </button>
          </Link>
        </div>

        {/* SEARCH BAR RESTORED EXACTLY AS ORIGINAL - Search bar taken out from nav bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link to="/login">
            <button
              className="top-search-button"
              style={{
                padding: "6px 14px",
                backgroundColor: "#66BB6A",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Background and Grid */}
      {/* Background and Grid */}
      <div
        style={{
          backgroundImage: `url(${collegeAveBg})`,
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
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
            backgroundColor: "#d3d3d3",
            borderRadius: "12px",
            padding: "30px",
            width: "90%",
            maxWidth: "1200px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Search bar and Filter Button (Restored EXACTLY) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#2c3e50",
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {/* <input
              type="text"
              placeholder="Search for houses..."
              style={{
                padding: "8px 12px",
                width: "250px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            /> */}
            <div style={{ position: "relative" }}></div>
          </div>

          {/* House Cards Grid (Restored EXACTLY with Save button) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {properties && properties.length > 0 ? (
              <>
                {properties.map((home, i) => {
                  return (
                    <div
                      key={home.zpid}
                      onClick={() => openModal(home)}
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <img
                        src={home.imgSrc}
                        alt={`House ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ padding: "10px" }}>
                        {/* Clearly improved price styling */}
                        <p
                          style={{
                            margin: "8px 0",
                            fontWeight: "700",
                            fontSize: "18px",
                            color: "#2c3e50",
                          }}
                        >
                          {home.price
                            ? String(home.price).startsWith("$")
                              ? home.price
                              : `$${home.price}`
                            : "Price Not Listed"}
                        </p>

                        {/* Availability Status */}
                        <p
                          style={{
                            color: home.available ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {home.available
                            ? "Currently Available"
                            : "No Longer Available"}
                        </p>

                        {/* Star Rating clearly ABOVE Save button */}
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#ffffff", // White text
                            backgroundColor: "#909090", // Light grayish background
                            borderRadius: "4px",
                            padding: "3px 8px",
                            display: "inline-block",
                          }}
                        >
                          ⭐ {home.rating.toFixed(1)} / 5
                        </div>

                        {/* Save button clearly BELOW Rating */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnSaveHouse(home._id);
                          }}
                          style={{
                            padding: "5px 12px",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "20px",
                            cursor: "pointer",
                            color: "#e91e63",
                            fontWeight: "bold",
                            display: "block", // clearly forces button below rating, not inline
                            margin: "0 auto",
                          }}
                        >
                          Unsave
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>You have yet to save any houses</p>
            )}
          </div>
        </div>
      </div>
      <SavedHousesDetailModel
        isOpen={modalOpen}
        onRequestClose={closeModal}
        house={selectedHouse}
      />
    </>
  );
}

export default SavedHousesPage;
