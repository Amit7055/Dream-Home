import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Details() {
  const [listing, setListing] = useState(null);
  const [image, setImage] = useState(null);
  const { setPropertyId } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const query = parseInt(searchParams.get("q"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(query)) {
      console.error("Invalid query parameter");
      return;
    }

    const fetchDetails = async () => {
      try {
        // Fetch property details
        const propertyResponse = await axios.get(
          `http://localhost:9999/properties/getproperty/${query}`
        );
        const propertyData = propertyResponse.data;
        setListing(propertyData);
        if (propertyData) {
          // Set the propertyId in the context
          setPropertyId(propertyData.propertyId);
        }

        // Fetch property image
        const imageResponse = await axios.get(
          `http://localhost:9999/api/images/property/${query}`
        );
        const imageData = imageResponse.data[0];
        if (imageData) {
          const base64Image = imageData.imageAsBase64 || imageData.imagedata;
          setImage(
            base64Image ? `data:image/jpeg;base64,${base64Image}` : null
          );
        }
      } catch (error) {
        console.error(
          "There was an error fetching the property details or image!",
          error
        );
      }
    };

    fetchDetails();
  }, [query, setPropertyId]);

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) for navigation
  };

  return (
    <div>
      <div className="container options-row text-center">
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/rent`)}
            >
              Rental Section
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy`)}
            >
              Buy Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/seller`)}
            >
              Sell Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/landlordtenant`)}
            >
              Landlord/Tenant
            </button>
          </div>
        </div>
      </div>
      <div
        className="container detail"
        style={{ marginTop: `1.5%`, marginBottom: `100px` }}
      >
        <h2 className="text-center mb-5 rent-option">Property Details</h2>
        {listing && (
          <div>
            <div className="row">
              <div className="col-md-6 ">
                <div className="card bg-secondary-subtle">
                  <div className="container">
                    <div className="row">
                        <div className="card-header text-center text-white bg-info">
                          <strong>
                            <h3>Property Image</h3>
                          </strong>
                        </div>
                        {image ? (
                          <img
                            src={image}
                            alt={listing.propertyType}
                            className="mt-5 mb-5 ml-4 mr-4"
                            style={{ width: `90%`, height: `90%` }}
                          />
                        ) : (
                          <p>
                            <h3>No image available</h3>
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-center text-white bg-info">
                    <h3>Property Details</h3>
                  </div>
                  <div className="card-body bg-primary-subtle">
                    <div className="container">
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label>Property Type:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={listing.propertyType}
                            readOnly
                          />
                        </div>
                        <div className="col-xl-12">
                          <div className="form-group">
                            <label>Address:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.address}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="form-group">
                            <label>Area:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.area}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="form-group">
                            <label>City:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.city}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="form-group">
                            <label>State:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.state}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.description}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Number of Bedroom:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.bedroom}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Number of Bathroom:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.bathroom}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Size:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.size + " sq foot"}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Year Built:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={listing.yearBuilt}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Price:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={"$" + listing.price}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label>Google Map URL:</label>
                            <p>
                              <a
                                href={listing.googleMap}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Map
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="buttons" style={{ marginTop: "20px" }}>
                          <button
                            className="btn btn-primary"
                            style={{ marginRight: "10px" }}
                            onClick={() => navigate(`/appointment?q=${listing.propertyId}`)}
                          >
                            Make an Appointment
                          </button>
                          {listing.type === "buy" && (
                            <button
                              className="btn btn-success"
                              style={{ marginRight: "10px" }}
                              onClick={() =>
                                navigate(`/buyerForm?q=${listing.propertyId}`)
                              }
                            >
                              Buy Now
                            </button>
                          )}
                          {listing.type === "rent" && (
                            <button
                              className="btn btn-success"
                              style={{ marginRight: "10px" }}
                              onClick={() =>
                                navigate(`/rentForm?q=${listing.propertyId}`)
                              }
                            >
                              Rent Now
                            </button>
                          )}
                          <button
                            className="btn btn-secondary"
                            onClick={handleBack}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
