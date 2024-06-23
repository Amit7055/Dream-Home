import React, { useState } from 'react';

export default function Landlord() {
  const [properties, setProperties] = useState(['Property 1', 'Property 2', 'Property 3']);
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [rent, setRent] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleAddProperty = (e) => {
    e.preventDefault();
    const newProperty = {
      address,
      type,
      rent,
      additionalInfo
    };
    setProperties([...properties, newProperty]);
    setAddress('');
    setType('');
    setRent('');
    setAdditionalInfo('');
  };

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome, Landlord</h1>
        <p>This is the landlord page for our real estate project</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2>Your Properties</h2>
              </div>
              <div className="card-body">
                <p>You have {properties.length} properties listed.</p>
                <ul className="list-group">
                  {properties.map((property, index) => (
                    <li key={index} className="list-group-item">
                      {typeof property === 'string' ? property : property.address}
                    </li>
                  ))}
                </ul>
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
                    <label htmlFor="type">Type:</label>
                    <select 
                      className="form-control" 
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="rent">Rent Amount:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="rent" 
                      placeholder="Enter rent amount"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="additionalInfo">Additional Information:</label>
                    <textarea 
                      className="form-control" 
                      id="additionalInfo" 
                      rows="3" 
                      placeholder="Enter additional information"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
