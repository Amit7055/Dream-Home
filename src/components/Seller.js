import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

export default function Seller() {
  const [searchParams] = useSearchParams();
  const userIdd = parseInt(searchParams.get("q"));
  
  const [property, setProperty] = useState({
    propertyType: '',
    googleMap: '',
    address: '',
    area: '',
    city: '',
    state: '',
    price: '',
    description: '',
    bedroom: '',
    bathroom: '',
    type: 'buy',
    status: 'Available',
    userId: userIdd, // Flatten userId for simplicity
  });
  const [image, setImage] = useState(null); // Separate state for image

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProperty({ ...property, [id]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all property fields to formData
    Object.keys(property).forEach(key => {
      formData.append(key, property[key]);
    });

    // Append the image file
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:9999/properties/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property submitted successfully:', response.data);
      // Handle navigation or success message here
    } catch (error) {
      console.error('There was an error submitting the property:', error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome, Seller</h1>
      </div>

      <div className="container mt-4">
        <h1 className="mb-4">List Your Property</h1>
        <p>Are you interested in selling your property? Please fill out the form below and we will get in touch with you shortly.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type</label>
            <select className="form-control" id="propertyType" value={property.propertyType} onChange={handleChange}>
              <option value="">Select</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Condo</option>
              <option>Land</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="googleMap">Google Map Link</label>
            <input type="text" className="form-control" id="googleMap" value={property.googleMap} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={property.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area</label>
            <input type="text" className="form-control" id="area" value={property.area} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" id="city" value={property.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" className="form-control" id="state" value={property.state} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" id="price" value={property.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Property Description</label>
            <textarea className="form-control" id="description" value={property.description} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="bedroom">Bedroom</label>
            <input type="text" className="form-control" id="bedroom" value={property.bedroom} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bathroom">Bathroom</label>
            <input type="text" className="form-control" id="bathroom" value={property.bathroom} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Images</label>
            <input type="file" className="form-control-file" id="image" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary mr-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
        </form>
      </div>
    </div>
  );
}
