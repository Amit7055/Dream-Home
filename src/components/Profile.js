import React, { useState } from 'react';

export default function Profile() {
  const [buyerPhoto, setBuyerPhoto] = useState('buyer_photo.jpg');
  const [renterPhoto, setRenterPhoto] = useState('renter_photo.jpg');

  const previewImage = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Buyer Profile */}
      <div className="container mt-5 profile">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3>Buyer Profile</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  id="buyer-photo"
                  src={buyerPhoto}
                  className="img-fluid rounded-circle"
                  alt="Buyer Photo"
                />
                <input
                  type="file"
                  className="mt-3 form-control-file"
                  onChange={(e) => previewImage(e, setBuyerPhoto)}
                />
              </div>
              <div className="col-md-8">
                <p>
                  <strong>Name:</strong> Jane Smith
                </p>
                <p>
                  <strong>Email:</strong> jane.smith@example.com
                </p>
                <p>
                  <strong>Location:</strong> Los Angeles, USA
                </p>
                <p>
                  <strong>Preferences:</strong> House, 3 bedrooms, Budget: $300,000
                </p>
                <button className="btn btn-primary">View History</button>
              </div>
            </div>
            <hr />
            <h4>History</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
              nunc elit. Donec in malesuada magna. Phasellus varius sollicitudin
              mi ut interdum.
            </p>
          </div>
        </div>
      </div>

      {/* Renter Profile */}
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-success text-white">
            <h3>Renter Profile</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  id="renter-photo"
                  src={renterPhoto}
                  className="img-fluid rounded-circle"
                  alt="Renter Photo"
                />
                <input
                  type="file"
                  className="mt-3 form-control-file"
                  onChange={(e) => previewImage(e, setRenterPhoto)}
                />
              </div>
              <div className="col-md-8">
                <p>
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <p>
                  <strong>Location:</strong> New York, USA
                </p>
                <p>
                  <strong>Preferences:</strong> Apartment, 2 bedrooms, Budget: $1500/month
                </p>
                <button className="btn btn-primary">View History</button>
              </div>
            </div>
            <hr />
            <h4>History</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
              nunc elit. Donec in malesuada magna. Phasellus varius sollicitudin
              mi ut interdum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

