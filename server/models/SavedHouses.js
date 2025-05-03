const mongoose = require("mongoose");

const SavedHouseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  bathrooms: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  livingArea: {
    type: Number,
  },
  propertyType: {
    type: String,
  },
  lotAreaValue: {
    type: Number,
  },
  listingStatus: {
    type: String,
  },
  preferences: {
    type: [String],
  },
  price: {
    type: Number,
  },
  imgSrc: {
    type: String,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  available: {
    type: Boolean,
  },
  leaseTerm: {
    type: String,
  },
  owner: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: { type: String },
  },
  carouselPhotos: [
    {
      url: {
        type: String,
      },
    },
  ],
  userId: {
    type: String,
    required: [true, "A userId is needed"],
  },
});

const SavedHouses = mongoose.model("SavedHouses", SavedHouseSchema);
module.exports = SavedHouses;
