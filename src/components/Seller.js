import React from 'react';

export default function Seller() {
  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome, Seller</h1>
      </div>

      <div className="container mt-4">
        <h1 className="mb-4">List Your Property</h1>
        <p>Are you interested in selling your property? Please fill out the form below and we will get in touch with you
          shortly.</p>
        <form>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type</label>
            <select className="form-control" id="propertyType">
              <option>House</option>
              <option>Apartment</option>
              <option>Condo</option>
              <option>Land</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="propertyName">Property Name</label>
            <input type="text" className="form-control" id="propertyName" />
          </div>
          <div className="form-group">
            <label htmlFor="propertyDescription">Property Description</label>
            <textarea className="form-control" id="propertyDescription" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="propertyPrice">Price</label>
            <input type="text" className="form-control" id="propertyPrice" />
          </div>
          <div className="form-group">
            <label htmlFor="propertyImage">Upload Images</label>
            <input type="file" className="form-control-file" id="propertyImage" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
