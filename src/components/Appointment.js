import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
  var navigate = useNavigate()
  return (
    <div className="container mt-5 appointment">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Appointment Form</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="date">Preferred Date</label>
                    <input type="date" className="form-control" id="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="property">Property of Interest</label>
                  <select className="form-control" id="property">
                    <option>Select Property</option>
                    <option>Property 1</option>
                    <option>Property 2</option>
                    <option>Property 3</option>
                    <option>Property 4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" rows="3" placeholder="Enter your message"></textarea>
                </div>
                <div className='buttons container text-center' style={{ marginTop: "20px" }}>
                <button type="submit" className="btn btn-primary" style={{ width:"100px" ,marginRight:"10px" }}>Submit</button>
                <button type="submit" className="btn btn-primary back" style={{width:"100px" }}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                >Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
