import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Landlord() {
  const { getUserId } = useContext(AuthContext);
  const landlordId = getUserId();
  const navigate = useNavigate();
  const type = "rent";
  const [displayProperties, setDisplayProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [size, setSize] = useState("");
  const [yearBuilt, setYearBuilt] = useState(0);
  const [error, setError] = useState(null);
  const [renterPhoto, setRenterPhoto] = useState("renter_photo.jpg");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch properties
        const response = await axios.get(
          "http://localhost:9999/properties/all"
        );
        const filteredProperties = response.data.filter(
          (property) =>
            property.user.userId === landlordId && property.type === type
        );
        setProperties(filteredProperties);

        // Fetch images
        const responseImage = await axios.get(
          "http://localhost:9999/api/images/all"
        );
        const imageMap = new Map(
          responseImage.data.map((image) => [
            image.properties.propertyId,
            image.imagedata,
          ])
        );

        // Map properties to include image URLs
        const updatedProperties = filteredProperties.map((property) => ({
          ...property,
          imageUrl: imageMap.get(property.propertyId)
            ? `data:image/jpeg;base64,${imageMap.get(property.propertyId)}`
            : "",
        }));

        setDisplayProperties(updatedProperties);
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
      type,
      propertyType,
      googleMap,
      address,
      area,
      city,
      state,
      price: parseFloat(price),
      description,
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
      const addedProperty = response.data;

      // Handle image upload
      await handleUploadImages(addedProperty.propertyId);

      // Fetch updated properties and images
      const responseProperties = await axios.get(
        "http://localhost:9999/properties/all"
      );
      const filteredProperties = responseProperties.data.filter(
        (property) =>
          property.user.userId === landlordId && property.type === type
      );

      const responseImages = await axios.get(
        "http://localhost:9999/api/images/all"
      );
      const imageMap = new Map(
        responseImages.data.map((image) => [
          image.properties.propertyId,
          image.imagedata,
        ])
      );

      const updatedProperties = filteredProperties.map((property) => ({
        ...property,
        imageUrl: imageMap.get(property.propertyId)
          ? `data:image/jpeg;base64,${imageMap.get(property.propertyId)}`
          : "",
      }));

      // Update properties and displayProperties
      setProperties(updatedProperties);
      setDisplayProperties(updatedProperties);

      // Clear property form
      setAddress("");
      setPropertyType("");
      setPrice("");
      setDescription("");
      setBedroom("");
      setBathroom("");
      setGoogleMap("");
      setArea("");
      setCity("");
      setState("");
      setSize("");
      setYearBuilt();
      setError(null);
    } catch (error) {
      toast.warning("Failed to add property", {
        className: 'custom-toast-warning',
      });
      console.error("There was an error adding the property!", error);
      setError("Failed to add property. Please try again.");
    }
  };

  const handleUploadImages = async (propertyId) => {
    if (selectedImages.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("files", selectedImages[i]);
    }

    try {
      await axios.post(
        `http://localhost:9999/api/images/upload/property/${propertyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success('Property Added Successful!', {
        className: 'custom-toast-success',
      });
    } catch (error) {
      toast.warning("Check Image type or Size", {
        className: 'custom-toast-warning',
      });
      await axios.delete( `http://localhost:9999/properties/delete/${propertyId}`);
      console.error("There was an error uploading the images!", error);
      setError("Failed to upload images. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // Create previews
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleDeleteProperty = async (propertyId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (isConfirmed) {
      try {
        // Fetch images associated with the property
        const responseImages = await axios.get(
          "http://localhost:9999/api/images/all"
        );
        const imagesToDelete = responseImages.data.filter(
          (image) => image.properties.propertyId === propertyId
        );

        // Delete images associated with the property
        for (const image of imagesToDelete) {
          await axios.delete(`http://localhost:9999/api/images/${image.id}`);
        }

        // Delete the property itself
        await axios.delete(
          `http://localhost:9999/properties/delete/${propertyId}`
        );

        // Update state to remove deleted property
        setProperties((prevProperties) =>
          prevProperties.filter(
            (property) => property.propertyId !== propertyId
          )
        );
        setDisplayProperties((prevDisplayProperties) =>
          prevDisplayProperties.filter(
            (property) => property.propertyId !== propertyId
          )
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
                  {displayProperties.map((property, index) => (
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
                          {property.imageUrl && (
                            <p>
                              Image:{" "}
                              <img
                                src={property.imageUrl}
                                alt="Property"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </p>
                          )}
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
                <h2>Add Property</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddProperty}>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
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
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Address:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Area:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>City:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>State:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="form-group">
                          <label>Description:</label>
                          <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Bedroom:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={bedroom}
                            onChange={(e) => setBedroom(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Bathroom:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={bathroom}
                            onChange={(e) => setBathroom(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Size:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Year Built:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={yearBuilt}
                            onChange={(e) => setYearBuilt(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Price:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Google Map URL:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={googleMap}
                            onChange={(e) => setGoogleMap(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        {imagePreviews.length > 0 ? (
                          imagePreviews.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`preview-${index}`}
                              style={{ maxWidth: "100%", marginRight: "10px" }}
                            />
                          ))
                        ) : (
                          <img
                            src="https://via.placeholder.com/350x200"
                            alt="default-preview"
                            style={{ maxWidth: "100%", marginRight: "10px" }}
                          />
                        )}
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Images:</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <button type="submit" className="btn btn-primary mt-3">
                          Add Property
                        </button>
                        <button
                          className="btn btn-secondary mt-3 ml-3"
                          onClick={handleBack}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
