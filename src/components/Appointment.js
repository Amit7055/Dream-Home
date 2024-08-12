import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
  const navigate = useNavigate();
  const { getUserId, getPropertyId } = useContext(AuthContext);
  const appointmentBooker = getUserId();
  const bookingPropertyId = getPropertyId();
  
  const [property, setProperty] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get('http://localhost:9999/properties/all');
        const foundProperty = response.data.find(prop => prop.propertyId === bookingPropertyId);

        const responseUser = await axios.get('http://localhost:9999/user/all');
        const foundUser = responseUser.data.find(prop => prop.userId === appointmentBooker);
        
        if (foundProperty && foundUser) {
          setProperty(foundProperty);
          // Setting user details based on the fetched property
          setEmail(foundUser.email);
          setName(`${foundUser.firstName} ${foundUser.lastName}`);
          setPhone(foundUser.phoneNo);
        } else {
          console.error('Property not found or User not found');
        }
      } catch (error) {
        console.error('There was an error fetching the property!', error);
      }
    };
  
    fetchProperty();
  }, [bookingPropertyId]);
  

  const handleBack = () => {
    navigate(-1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      appointmentDate: date,
      appointmentTime: null,
      phoneNo: phone,
      purpose: message, // Assuming 'purpose' is filled with the message content
      status: "Scheduled",
      details: `Meeting to discuss property details at ${property?.address}`,
      user: { userId: appointmentBooker },
      property: { propertyId: bookingPropertyId }
    };

    try {
      await axios.post('http://localhost:9999/appointment/add', appointment);
      alert('Appointment request sent successfully and you will confirmation shortly !!!');
      // navigate('/'); 
    } catch (error) {
      console.error('There was an error booking the appointment!', error);
    }
  };

  return (
    <div className="container mt-5 appointment">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0 text-center">Appointment Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="date">Preferred Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="property">Property of Interest</label> */}
                  <div className="card-header bg-info text-white mb-3">
                    <h4 className="mb-0 text-center">Property of Interest</h4>
                  </div>
                  <div className='container'>
                  <div className='row'>
                    <div className='col-xl-6 mt-2'>
                      <img src={property.image} alt={property.propertyType} className="appointment-image" />
                    </div>
                    <div className='col-xl-6  mt-2'>
                      <b><p>Property Type : {property.propertyType}</p></b>
                      <p>Property For : {property.type}</p>
                      <p>{property.description}</p>
                      <p>Price: ${property.price}</p>
                      <p>City: {property.city}</p>
                      <p>Area: {property.area}</p>
                      <p>Bedrooms: {property.bedroom}</p> 
                      <p>Bathrooms: {property.bathroom}</p>
                      <p>Address: {property.address}</p>
                      <p>Size: {property.size}</p>
                      <p>Year Built: {property.yearBuilt}</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className='buttons container text-center' style={{ marginTop: "20px" }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100px", marginRight: "10px" }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: "100px" }}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
