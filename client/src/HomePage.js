import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { houseData } from "./HouseDetail";
import logo from "./images/RuLogo.png";
import rutgersR from "./images/Rutgers-R.png";
import avatar from "./images/default_avatar.png";
import collegeAveBg from "./images/college_ave_background.png";
import { throttledAxios } from "./utils/throttleAxios";
import HouseDetailModal from "./HouseDetailModal"; //////
import "./HomePage.css";
import owners from "./ownerData";
import FilterDropdown from "./FilterDropdown";

function HomePage() {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [savedHouses, setSavedHouses] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [homeTypeFilter, setHomeTypeFilter] = useState("");
  const [statusTypeFilter, setStatusTypeFilter] = useState("ForRent");
  const [sortOrder, setSortOrder] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(
    "New Brunswick NJ; Somerset, NJ; Edison, NJ; East Brunswick, NJ; Piscataway, NJ"
  );

  const [page, setPage] = useState(1);

  //// user filtering HERE ------ ////
  // step1: add a useState variabel exactly like the one bellow BUT with a different name
  const [searchProperties, setSearchProperties] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // this is only if you are using a button like a submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    setQuery(searchProperties);
    setPage(1);
  };
  //// user filtering HERE ------ ////

  const navigate = useNavigate();
  const location = useLocation(); // ← NEW

  // “Home” navbar button behaviour
  const handleHomeClick = () => {
    if (location.pathname === "/home") {
      // already on /home  → force a refresh
      navigate(0); // react-router-dom v6 helper
    } else {
      navigate("/home"); // go to homepage from elsewhere
    }
  };

  // Saved-Houses button behaviour
  const handleSavedClick = () => {
    if (location.pathname === "/saved-houses") {
      navigate(0); // refresh page
    } else {
      navigate("/saved-houses");
    }
  };

  const openModal = (house) => {
    setSelectedHouse(house);
    setModalOpen(true);
  };
  const handleHouseClick = (id) => {
    navigate(`/house/${id}`);
  };

  const handleSaveHouse = (houseId) => {
    const storedSavedHouses = localStorage.getItem("savedHouses");
    const currentSavedHouses = storedSavedHouses
      ? JSON.parse(storedSavedHouses)
      : [];

    if (!currentSavedHouses.includes(houseId)) {
      localStorage.setItem(
        "savedHouses",
        JSON.stringify([...currentSavedHouses, houseId])
      );
      setSavedHouses([...currentSavedHouses, houseId]); // Update local state for immediate UI feedback
      alert(`House #${houseId} saved!`);
    } else {
      const updatedSavedHouses = currentSavedHouses.filter(
        (id) => id !== houseId
      );
      localStorage.setItem("savedHouses", JSON.stringify(updatedSavedHouses));
      setSavedHouses(updatedSavedHouses); // Update local state
      alert(`House #${houseId} unsaved!`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHouse(null);
  };
  // IMPORTANT MAKE THIS INTO A COMMIT TO NOT RUN OUT OF THE API TRIALS WHEN YOU ARE TESTING THE WEBSITE!!!!! COMMENT useEffect FUNCTION!!!!
  // code that call sthe zilow API
  const fetchProperties = async () => {
    console.log("The sort Order is ============== ");
    try {
      const res = await throttledAxios({
        method: "GET",
        url: "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch",
        params: {
          location: query,
          home_type: homeTypeFilter || undefined,
          status_type: statusTypeFilter || undefined,
          page: page,
          sort: sortOrder,
        },
        headers: {
          "X-RapidAPI-Key": "", // Replace with your actual API key in the qoutes on this line
          "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
        },
      });
      setProperties(res.data.props || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, [page, query, homeTypeFilter, statusTypeFilter, sortOrder]);

  console.log("the houses are ==== ", properties);

  // Function to determine if a house is available or not
  const isHouseAvailable = (house) => {
    if (!house.price) {
      return false; // Automatically unavailable if no price listed
    }
    // Consistent random assignment using Zillow's unique ID (zpid)
    const randomSeed = parseInt(house.zpid.slice(-3), 10);
    return randomSeed % 10 !== 0; // 90% available, 10% unavailable
  };

  // Helper function to generate consistent star ratings
  const getHouseRating = (house) => {
    const randomSeed = parseInt(house.zpid.slice(-4), 10);
    const ratingsArray = [3.5, 4.0, 4.5, 5.0, 3.0, 2.5]; // most ratings 3.5+
    return ratingsArray[randomSeed % ratingsArray.length];
  };

  // (after getHouseRating)
  // Turn "$1,200+" or 1200 into a plain Number
  const extractPriceValue = (price) =>
    Number(String(price).replace(/[^0-9.-]+/g, ""));

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const displayedProperties = useMemo(() => {
    // No sort? show raw API list
    if (!sortOrder) return properties;

    // Keep only homes with a price
    const pricedHomes = properties.filter((h) => h.price);

    // Sort by numeric price
    return pricedHomes.sort((a, b) => {
      const aVal = extractPriceValue(a.price);
      const bVal = extractPriceValue(b.price);
      return sortOrder === "Price_Low_High" ? aVal - bVal : bVal - aVal;
    });
  }, [properties, sortOrder]);

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
            src={avatar}
            alt="User Avatar"
            style={{ height: "60px", width: "60px", borderRadius: "50%" }}
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

        {/* SEARCH BAR RESTORED EXACTLY AS ORIGINAL */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            placeholder="Search"
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "180px",
            }}
          />
          <button
            className="top-search-button"
            style={{
              padding: "6px 14px",
              backgroundColor: "#388E3C",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              border: "none",
            }}
          >
            Search
          </button>
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchProperties}
                onChange={(e) => setSearchProperties(e.target.value)}
                placeholder="Enter City or Area"
              />
              <button type="submit">Search</button>
            </form>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowFilterDropdown((prev) => !prev)}
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

              <FilterDropdown
                show={showFilterDropdown}
                onClose={() => setShowFilterDropdown(false)}
                onFilterChange={(filterUpdate) => {
                  if (filterUpdate.homeType !== undefined)
                    setHomeTypeFilter(filterUpdate.homeType);
                  if (filterUpdate.statusType !== undefined)
                    setStatusTypeFilter(filterUpdate.statusType);
                  if (filterUpdate.sortOrder !== undefined)
                    console.log(
                      "the sortOrder in Homepage.js ----------------: ",
                      filterUpdate.sortOrder
                    );
                  setSortOrder(filterUpdate.sortOrder);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* House Cards Grid (Restored EXACTLY with Save button) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {displayedProperties.map((home, i) => {
              const available = isHouseAvailable(home);
              const rating = getHouseRating(home);

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
                        color: available ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {available
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
                      ⭐ {getHouseRating(home).toFixed(1)} / 5
                    </div>

                    {/* Save button clearly BELOW Rating */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveHouse(home.zpid);
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
                      ♥{" "}
                      {localStorage.getItem("savedHouses") &&
                      JSON.parse(localStorage.getItem("savedHouses")).includes(
                        home.zpid
                      )
                        ? "Unsave"
                        : "Save"}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Number of pages for filter HERE */}
            <div style={{ marginTop: "20px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  style={{
                    margin: "4px",
                    padding: "6px 12px",
                    backgroundColor: pg === page ? "#333" : "#eee",
                    color: pg === page ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {pg}
                </button>
              ))}
            </div>
            {/* Number of pages for filter HERE */}
          </div>
        </div>
      </div>
      <HouseDetailModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        house={selectedHouse}
        available={selectedHouse ? isHouseAvailable(selectedHouse) : false}
        rating={selectedHouse ? getHouseRating(selectedHouse) : 0}
      />
    </>
  );
}
export default HomePage;
