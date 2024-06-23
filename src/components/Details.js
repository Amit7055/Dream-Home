import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const listings = [
  {
    id: 1,
    type: "rent",
    propertyType: "Apartment",
    description: "2-bedroom apartment in downtown",
    price: 1500,
    img: "https://media.istockphoto.com/id/1365649825/photo/stylish-micro-apartment-for-one.jpg?s=612x612&w=0&k=20&c=B84a7PkFLhZGTG0GPDOxBs2yDjBvy2NHaqZw5_Vp878=",
    city: "New York",
    area: "Downtown",
    bedrooms: 2,
    bathrooms: 1,
    size: "800 sqft",
    yearBuilt: 2015,
    amenities: ["Gym", "Pool", "Parking"],
  },
  {
    id: 2,
    type: "buy",
    propertyType: "House",
    description: "3-bedroom house with a garden",
    price: 350000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErDL1tl6xeGFzwxM6VOvUyBIjapS7czYdag&s",
    city: "San Francisco",
    area: "Sunset District",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 3,
    type: "rent",
    propertyType: "Studio",
    description: "Studio apartment near university",
    price: 800,
    img: "https://www.interiorzine.com/wp-content/uploads/2017/11/small-scale-modern-loft-design-sliding-staircase.jpg",
    city: "Boston",
    area: "Cambridge",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 4,
    type: "buy",
    propertyType: "Condo",
    description: "Luxury condo with sea view",
    price: 750000,
    img: "https://c4.wallpaperflare.com/wallpaper/1011/101/300/apartment-condo-design-home-wallpaper-preview.jpg",
    city: "Miami",
    area: "South Beach",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 5,
    type: "rent",
    propertyType: "Apartment",
    description: "1-bedroom apartment in suburbs",
    price: 1200,
    img: "https://c4.wallpaperflare.com/wallpaper/396/394/415/city-apartment-design-wallpaper-preview.jpg",
    city: "Los Angeles",
    area: "Pasadena",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 6,
    type: "buy",
    propertyType: "Cottage",
    description: "Cozy cottage in the countryside",
    price: 250000,
    img: "https://images2.alphacoders.com/688/thumb-1920-688918.jpg",
    city: "Nashville",
    area: "Franklin",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 7,
    type: "rent",
    propertyType: "Room",
    description: "Shared room in a house",
    price: 500,
    img: "https://c1.wallpaperflare.com/preview/49/427/736/apartment-stylish-home-wooden-comfortable-apartment.jpg",
    city: "Austin",
    area: "Downtown",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 8,
    type: "buy",
    propertyType: "Townhouse",
    description: "Modern townhouse with garage",
    price: 400000,
    img: "https://media.istockphoto.com/id/1482804679/photo/modern-apartment-buildings.webp?b=1&s=170667a&w=0&k=20&c=INNQZ1WLyr2dWZe5gcr04xsWQ2Hk6xe_L0vkrgfv79Q=",
    city: "Seattle",
    area: "Capitol Hill",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 9,
    type: "rent",
    propertyType: "Apartment",
    description: "3-bedroom apartment in city center",
    price: 2000,
    img: "https://png.pngtree.com/thumb_back/fh260/background/20230526/pngtree-d-apartment-building-complex-with-a-car-on-the-front-sidewalk-image_2635489.jpg",
    city: "Chicago",
    area: "Loop",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 10,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 11,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 12,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 13,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 14,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "Nashik",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
  {
    id: 15,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "Nashik",
    area: "Manhattan",
    bedrooms: 3,
    bathrooms: 2,
    size: "2000 sqft",
    yearBuilt: 2000,
    amenities: ["Garden", "Garage", "Fireplace"],
  },
];

export default function Details() {
  const [searchParams] = useSearchParams();
  const query = parseInt(searchParams.get("q"));
  // Filter the listings based on the query
  const filteredListings = listings.filter((listing) => listing.id === query);

  var navigate = useNavigate();

  return (
    <div className="container detail">
      <h2 className='text-center mb-5'>Property Details</h2>
      {filteredListings.map((listing) => (
        <div key={listing.id}>
          <div className="row">
            <div className="col-md-6 col6-1 image text-center">
              <img src={listing.img} alt={listing.propertyType} className="image-6" />
            </div>
            <div className="col-md-6 col6-2">
              <h2>{listing.propertyType}</h2>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>City: {listing.city}</p>
              <p>Area: {listing.area}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
              <p>Size: {listing.size}</p>
              <p>Year Built: {listing.yearBuilt}</p>
              <p>Amenities: {listing.amenities.join(", ")}</p>
              <p>Description:{listing.description}</p>
              <div className="buttons" style={{ marginTop: "20px" }}>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate("/appointment");
                  }}
                >
                  Make an Appointment
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    navigate(`/buyerForm?q=${listing.id}`);
                  }}
                >
                  Buy Now
                </button>
              </div>
              <Link to="/home" style={{ marginTop: "20px", display: "block" }}>
                Back to Listings
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
