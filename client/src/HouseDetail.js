import React from "react";
import { useParams, Link } from "react-router-dom";

export const houseData = { // Add 'export' keyword here
  "1": { name: "Spacious House Near Campus", location: "123 College Ave, New Brunswick, NJ", amenities: ["4 Bedrooms", "2 Bathrooms", "Kitchen", "Laundry", "Parking"], reviews: [{ user: "Student A", rating: 5, comment: "Great place to live!" }, { user: "Student B", rating: 4, comment: "Close to everything." }] },
  "2": { name: "Cozy Apartment", location: "456 Hamilton St, Highland Park, NJ", amenities: ["2 Bedrooms", "1 Bathroom", "Kitchen", "Laundry"], reviews: [{ user: "Resident X", rating: 4, comment: "Nice and quiet." }] },
  "3": { name: "Townhouse with Yard", location: "789 Easton Ave, Somerset, NJ", amenities: ["3 Bedrooms", "2.5 Bathrooms", "Kitchen", "Laundry", "Yard"], reviews: [] },
  "4": { name: "Studio Apartment", location: "101 George St, New Brunswick, NJ", amenities: ["1 Bedroom", "1 Bathroom", "Kitchen"], reviews: [{ user: "Solo Traveler", rating: 5, comment: "Perfect for one person." }] },
  "5": { name: "Large House for Groups", location: "222 Highland Ave, Highland Park, NJ", amenities: ["6 Bedrooms", "3 Bathrooms", "Large Kitchen", "Laundry", "Parking"], reviews: [{ user: "Group Alpha", rating: 5, comment: "Plenty of space!" }] },
  "6": { name: "Affordable Housing Option", location: "333 Union St, New Brunswick, NJ", amenities: ["2 Bedrooms", "1 Bathroom", "Kitchen"], reviews: [{ user: "Budget Conscious", rating: 4, comment: "Good value for money." }] },
};

function HouseDetail() {
  const { id } = useParams();
  console.log("House ID from URL:", id);
  const house = houseData[id];
  console.log("Fetched House Data:", house);

  if (!house) {
    return <div>House not found</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{house.name}</h2>
      <p><strong>Location:</strong> {house.location}</p>
      <h3>Amenities:</h3>
      <ul>
        {house.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <h3>Reviews:</h3>
      {house.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {house.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating}/5)
            </li>
          ))}
        </ul>
      )}
      <Link to="/" style={{ display: "block", marginTop: "20px", color: "blue", textDecoration: "none" }}>
        Back to Home
      </Link>
    </div>
  );
}

export default HouseDetail;