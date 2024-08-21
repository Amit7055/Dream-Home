import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function LandlordTenantSection() {
    var navigate = useNavigate();
    return (
        <div>
            <div className=" container options-row text-center">
        <div className="row">
          <div className="col-md-3">
            <button className="btn btn-success" onClick={() => {navigate(`/rent`);}}>
              Rental Section
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success" onClick={() => {navigate(`/buy`); }}>
              Buy Property
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success" onClick={() => { navigate(`/seller`); }}>
              Sell Property
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success" onClick={() => { navigate(`/landlordtenant`); }}>
              Landlord/Tenant 
            </button>
          </div>
        </div>
      </div>
            <div className="container custom-container mt-5">
                <div className="row g-4">
                    <div className="col-lg-6 col-md-12">
                        <div className="card custom-card">
                            <div className="card-header custom-card-header">
                                Landlord
                            </div>
                            <div className="card-body custom-card-body">
                                <h5 className="card-title">Welcome Landlord</h5>
                                <p className="card-text">Manage your properties and view tenant requests here.</p>
                                <Link to="/landlord" className="btn custom-btn">Manage Landlord Profile</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="card custom-card">
                            <div className="card-header custom-card-header">
                                Tenant
                            </div>
                            <div className="card-body custom-card-body">
                                <h5 className="card-title">Welcome Tenant</h5>
                                <p className="card-text">Browse available properties and manage your rental details here.</p>
                                <Link to="/tenant" className="btn custom-btn">Browse Properties</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
