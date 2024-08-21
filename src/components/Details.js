import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Details() {
  const [listings, setListings] = useState([]);
  const { setPropertyId } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/properties/all"
        );
        setListings(response.data);
        const filteredListing = response.data.find(
          (listing) => listing.propertyId === query
        );
        if (filteredListing) {
          // Set the propertyId in the context
          setPropertyId(filteredListing.propertyId);
        }
      } catch (error) {
        console.error("There was an error fetching the properties!", error);
      }
    };

    fetchProperties();
  }, []);

  const [searchParams] = useSearchParams();
  const query = parseInt(searchParams.get("q"));

  const filteredListings = listings.filter(
    (listing) => listing.propertyId === query
  );

  var navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) for navigation
  };

  return (
    
    <div className="container detail" style={{ marginBottom: `100px` }}>
      <h2 className="text-center mb-5 options-row">Property Details</h2>
      {filteredListings.map((listing) => (
        <div key={listing.propertyId}>
          <div className="row">
            <div className="col-md-6 col6-1 image text-center">
              <img
                src={listing.image}
                alt={listing.propertyType}
                className="image-6"
              />
            </div>
            <div className="col-md-6 col6-2">
              <h2>{listing.propertyType}</h2>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>City: {listing.city}</p>
              <p>Area: {listing.area}</p>
              <p>Bedrooms: {listing.bedroom}</p>
              <p>Bathrooms: {listing.bathroom}</p>
              <p>Address: {listing.address}</p>
              <p>Size: {listing.size}</p>
              <p>Year Built: {listing.yearBuilt}</p>
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
                    navigate(`/buyerForm?q=${listing.propertyId}`);
                  }}
                >
                  Buy Now
                </button>
              </div>
              <button className="btn btn-secondary mt-2" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
