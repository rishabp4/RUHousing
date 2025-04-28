import React from "react";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

Modal.setAppElement("#root");

function HouseDetailModal({ isOpen, onRequestClose, house }) {
  if (!house) return null;

  // const images = house.imgSrc
  //   ? [{ original: house.imgSrc, thumbnail: house.imgSrc }]
  //   : [];

  // first check if carousel photos exist
  // --- if NOT EXIST we will use the regular thumbnail image
  const photos = house.carouselPhotos
    ? house.carouselPhotos
    : [{ url: house.imgSrc }];

  // second: push all the carousel photos from the API respopnse to a new array
  const images = [];
  photos.map((pic, i) => {
    images.push({ original: pic.url, thumbnail: pic.url });
  });

  const preferenceList = [
    "Roommates available",
    "No partying",
    "Smoking",
    "No guests allowed",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.8)" },
        content: {
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "10px",
          padding: "0",
          overflow: "auto",
          backgroundColor: "#f0f8ff", // very light blue
        },
      }}
    >
      <ImageGallery items={images} showPlayButton={false} />

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "5px" }}
        >
          {house.price
            ? `$${Number(house.price).toLocaleString()}/month`
            : "Price Not Listed"}
        </h2>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "15px" }}>
          {house.address || "Address not available"}
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          <span>🛏️ {house.bedrooms || "N/A"} beds</span>
          <span>🛁 {house.bathrooms || "N/A"} baths</span>
          <span>📐 {house.livingArea || "N/A"} sqft</span>
        </div>

        <div style={{ fontSize: "15px", color: "#555" }}>
          <p>
            <strong>Property Type:</strong> {house.propertyType || "N/A"}
          </p>
          <p>
            <strong>Lot Area:</strong>{" "}
            {house.lotAreaValue ? `${house.lotAreaValue} sqft` : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {house.listingStatus || "N/A"}
          </p>
        </div>

        <div style={{ marginTop: "20px", fontSize: "15px", color: "#555" }}>
          <h3 style={{ marginBottom: "10px" }}>Preferences:</h3>
          <ul>
            {preferenceList.map((pref, idx) => (
              <li key={idx}>✅ {pref}</li>
            ))}
          </ul>
        </div>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px",
            marginRight: "10px",
          }}
        >
          Save as
        </button>

        <button
          onClick={onRequestClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default HouseDetailModal;
