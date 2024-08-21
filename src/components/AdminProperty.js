import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminProperty() {
    const [displayProperties, setDisplayProperties] = useState([]);
  const [activeSection, setActiveSection] = useState("rent");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/properties/all"
        );
        const fetchedListings = response.data;

        const responseImage = await axios.get(
          "http://localhost:9999/api/images/all"
        );
        const imageMap = new Map(
          responseImage.data.map((image) => [
            image.properties.propertyId,
            image.imagedata,
          ])
        );

        const updatedProperties = fetchedListings.map((property) => ({
          ...property,
          imageUrl: imageMap.get(property.propertyId)
            ? `data:image/jpeg;base64,${imageMap.get(property.propertyId)}`
            : "",
        }));
        setDisplayProperties(updatedProperties);
      } catch (error) {
        console.error("There was an error fetching the properties!", error);
      }
    };

    fetchProperties();
  }, []);

  const rentProperties = displayProperties.filter(
    (property) => property.type === "rent"
  );
  const buyProperties = displayProperties.filter(
    (property) => property.type === "buy"
  );

  return (
    <>
      <div className="container custom-container">
        <div className="col-12 text-center mb-3">
          <div className="row">
            <div className="col-md-6">
              <button
                className={`btn btn-light w-100 ${
                  activeSection === "rent" ? "active" : ""
                }`}
                onClick={() => setActiveSection("rent")}
              >
                Rent
              </button>
            </div>
            <div className="col-md-6">
              <button
                className={`btn btn-light w-100 ${
                  activeSection === "buy" ? "active" : ""
                }`}
                onClick={() => setActiveSection("buy")}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-5%"}} >
        <div className="row">
          <div className="col-12">
            {activeSection === "rent" && (
              <div>
                <h2 className="text-center">Rent Properties</h2>
                {rentProperties.map((property) => (
                  <div className="row mb-4">
                    <div className="col-xl-3">
                      <img
                        src={property.imageUrl}
                        alt="Property"
                        className="card-img"
                        style={{ maxWidth: "100%", marginRight: "10px" }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">{property.propertyType}</h5>
                        <p className="card-text">Address: {property.address}</p>
                        <p className="card-text">Price: ${property.price}</p>
                        <p className="card-text">City: {property.city}</p>
                        <p className="card-text">State: {property.state}</p>
                        <p className="card-text">Size: {property.size} sqft</p>
                        <p className="card-text">
                          Year Built: {property.yearBuilt}
                        </p>
                        <button className="btn btn-primary" style={{ width: "45%"  , marginRight:"5%"}} >Details</button>
                        <button className="btn btn-success" style={{ width: "45%"}} >View Appointment</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "buy" && (
              <div>
                <h2 className="text-center">Buy Properties</h2>
                {buyProperties.map((property) => (
                  <div className="row mb-4">
                    <div className="col-xl-3">
                      <img
                        src={property.imageUrl}
                        alt="Property"
                        className="card-img"
                        style={{ maxWidth: "100%", marginRight: "10px" }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">{property.propertyType}</h5>
                        <p className="card-text">Address: {property.address}</p>
                        <p className="card-text">Price: ${property.price}</p>
                        <p className="card-text">City: {property.city}</p>
                        <p className="card-text">State: {property.state}</p>
                        <p className="card-text">Size: {property.size} sqft</p>
                        <p className="card-text">
                          Year Built: {property.yearBuilt}
                        </p>
                        <button className="btn btn-primary" style={{ width: "45%"  , marginRight:"5%"}} >Details</button>
                        <button className="btn btn-success" style={{ width: "45%"}} >View Appointment</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
