import "./FilterDropdown.css";
import React, { useState } from "react";

const FilterDropdown = ({ show, onClose, onFilterChange }) => {
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(0);
  //const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [homeType, setHomeType] = useState("");
  const [statusType, setStatusType] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  /*const preferencesList = [
    "No smoking",
    "No pets allowed",
    "No loud music after 11 PM",
    "No partying",
    "Background check required",
    "Proof of income required",
    "Security deposit required",
    "Utilities included (water, electricity, gas)",
    "No modifications or painting",
    "Parking for residents only",
    "Regular landlord inspections",
    "Proper disposal of trash and recycling required",
  ];*/

  /*const handleCheckboxChange = (pref) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };*/

  const handleSortSubmit = (e) => {
    console.log(e);
    setSortOrder(e.target.value);
    onFilterChange({ sortOrder: e.target.value });
  };

  const handleHomeTypeChange = (e) => {
    setHomeType(e.target.value);
    onFilterChange({ homeType: e.target.value });
  };

  const handleStatusTypeChange = (e) => {
    setStatusType(e.target.value);
    onFilterChange({ statusType: e.target.value });
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
        width: "300px",
        right: 0,
        marginTop: "10px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "5px",
          right: "8px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        ×
      </button>

      <h4 style={{ marginTop: 0 }}>Sort</h4>
      <button
        style={{ marginRight: "8px" }}
        value={"Price_High_Low"}
        onClick={handleSortSubmit}
      >
        Price: High to Low
      </button>
      <button value={"Price_Low_High"} onClick={handleSortSubmit}>
        Price: Low to High
      </button>

      <h4 style={{ marginTop: "15px" }}>Min Price Range</h4>
      <input
        type="range"
        min="0"
        max="20000"
        step="100"
        value={minPriceRange}
        onChange={(e) => setMinPriceRange(e.target.value)}
      />
      <span style={{ marginLeft: "10px" }}>${minPriceRange}</span>

      <h4 style={{ marginTop: "15px" }}>Max Price Range</h4>
      <input
        type="range"
        min="20000"
        max="50000"
        step="500"
        value={maxPriceRange}
        onChange={(e) => setMaxPriceRange(e.target.value)}
      />
      <span style={{ marginLeft: "10px" }}>${maxPriceRange}</span>

      <h4 style={{ marginTop: "15px" }}>House Status Type</h4>
      <select value={statusType} onChange={handleStatusTypeChange}>
        <option value="">Select Status</option>
        <option value="ForSale">For Sale</option>
        <option value="ForRent">For Rent</option>
        <option value="RecentlySold">Recently Sold</option>
      </select>

      <h4 style={{ marginTop: "15px" }}>Home Type</h4>
      <select value={homeType} onChange={handleHomeTypeChange}>
        <option value="">Select Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Condo">Condo</option>
        <option value="SingleFamily">Single Family</option>
        <option value="Townhouse">Townhouse</option>
        <option value="MultiFamily">Multi Family</option>
        <option value="Manufactured">Manufactured</option>
      </select>

      {/* <h4 style={{ marginTop: "15px" }}>Preferences</h4>
      {preferencesList.map((pref, index) => (
        <label key={index} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedPreferences.includes(pref)}
            onChange={() => handleCheckboxChange(pref)}
          />{" "}
          {pref}
        </label>
      ))} */}
    </div>
  );
};

export default FilterDropdown;
