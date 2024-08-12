import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Landlord() {
  const { getUserId } = useContext(AuthContext);
  const landlordId = getUserId();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [size, setSize] = useState("");
  const [yearBuilt, setYearBuilt] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/properties/all"
        );
        const filteredProperties = response.data.filter(
          (property) => property.user.userId === landlordId
        );
        setProperties(filteredProperties);
      } catch (error) {
        console.error("There was an error fetching the properties!", error);
        setError("Failed to load properties. Please try again later.");
      }
    };

    fetchProperties();
  }, [landlordId]);

  const handleAddProperty = async (e) => {
    e.preventDefault();

    const newProperty = {
      type: "rent",
      propertyType,
      googleMap,
      address,
      area,
      city,
      state,
      price: parseFloat(price),
      description,
      image,
      bedroom: parseInt(bedroom),
      bathroom: parseInt(bathroom),
      status: "Available",
      size,
      yearBuilt,
      user: {
        userId: landlordId,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:9999/properties/add",
        newProperty
      );
      setProperties([...properties, response.data]);
      // Reset form fields
      setAddress("");
      setPropertyType("");
      setPrice("");
      setDescription("");
      setImage("");
      setBedroom("");
      setBathroom("");
      setGoogleMap("");
      setArea("");
      setCity("");
      setState("");
      setSize("");
      setYearBuilt(0);
      setError(null);
    } catch (error) {
      console.error("There was an error adding the property!", error);
      setError("Failed to add property. Please try again.");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:9999/properties/delete/${propertyId}`
        );
        // Remove the deleted property from the state
        setProperties(
          properties.filter((property) => property.propertyId !== propertyId)
        );
      } catch (error) {
        console.error("There was an error deleting the property!", error);
        setError("Failed to delete property. Please try again.");
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) for navigation
  };

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome, Landlord</h1>
        <p>This is the landlord page for our real estate project</p>
      </div>
      <div className="container">
        <button className="btn btn-secondary mb-3" onClick={handleBack}>
          Back
        </button>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2>Your Properties</h2>
              </div>
              <div className="card-body">
                <p>You have {properties.length} properties listed.</p>
                {error && <div className="alert alert-danger">{error}</div>}
                <div
                  className="accordion accordion-flush"
                  id="propertiesAccordion"
                >
                  {properties.map((property, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0} // Only the first item is open by default
                          aria-controls={`collapse${index}`}
                        >
                          {property.address} - {property.propertyType}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#propertiesAccordion"
                      >
                        <div className="accordion-body">
                          <p>Price: ${property.price}</p>
                          <p>Description: {property.description}</p>
                          <p>Area: {property.area}</p>
                          <p>City: {property.city}</p>
                          <p>State: {property.state}</p>
                          <p>Size: {property.size}</p>
                          <p>Year Built: {property.yearBuilt}</p>
                          <p>Bedrooms: {property.bedroom}</p>
                          <p>Bathrooms: {property.bathroom}</p>
                          <p>
                            Google Map URL:{" "}
                            <a
                              href={property.googleMap}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Map
                            </a>
                          </p>
                          <p>
                            Image:{" "}
                            <img
                              src={property.image}
                              alt="Property"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </p>
                          <button
                            className="btn btn-danger mt-3"
                            onClick={() =>
                              handleDeleteProperty(property.propertyId)
                            }
                          >
                            Delete Property
                          </button>
                          <button
                            className="btn btn-success mt-3 ml-2"
                            onClick={() => {
                              navigate(
                                `/viewappointments?a=${property.propertyId}`
                              );
                            }}
                          >
                            View Appointments
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2>Add New Property</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddProperty}>
                  <div className="form-group">
                    <label htmlFor="propertyType">Property Type:</label>
                    <select
                      className="form-control"
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter property address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="area">Area:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      placeholder="Enter area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="Enter price amount"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Enter property description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      placeholder="Enter image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bedroom">Bedroom:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="bedroom"
                      placeholder="Enter number of bedrooms"
                      value={bedroom}
                      onChange={(e) => setBedroom(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bathroom">Bathroom:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="bathroom"
                      placeholder="Enter number of bathrooms"
                      value={bathroom}
                      onChange={(e) => setBathroom(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="googleMap">Google Map URL:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="googleMap"
                      placeholder="Enter Google Map URL"
                      value={googleMap}
                      onChange={(e) => setGoogleMap(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="size"
                      placeholder="Enter size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="yearBuilt">Year Built:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="yearBuilt"
                      placeholder="Enter year built"
                      value={yearBuilt}
                      onChange={(e) =>
                        setYearBuilt(parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
