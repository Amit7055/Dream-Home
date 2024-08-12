import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchParams] = useSearchParams();
  const appointmentProperty = parseInt(searchParams.get("a"), 10);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) for navigation
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:9999/appointment/all');
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.property.propertyId === appointmentProperty
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('There was an error fetching the appointments!', error);
      }
    };

    fetchAppointments();
  }, [appointmentProperty]); // Dependency array includes appointmentProperty

  return (
    <>
    <div className="container custom-container mt-5">
      <h2 className="mb-4">View Appointments</h2>
      <div className="list-group">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.appointmentId} className="list-group-item">
                <div className='row'>
                    <div className='col-xl-6'>
                    <img src={appointment.property.image} alt={appointment.property.propertyType} className="img-fluid mb-2" style={{ maxWidth: '200px' }} />
                    </div>
                    <div className='col-xl-6'>
                        <h5 className="mb-1">Appointment ID: {appointment.appointmentId}</h5>
                        <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                        <p><strong>Phone Number:</strong> {appointment.phoneNo}</p>
                        <p><strong>Purpose:</strong> {appointment.purpose}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                        <p><strong>Details:</strong> {appointment.details}</p>
                        <h6>Customer Details</h6>
                        <p><strong>Name:</strong> {appointment.user.firstName + appointment.user.lastName}</p>
                        <p><strong>Email:</strong> {appointment.user.email}</p>
                        {/* <h6>Property Details</h6>
                        <p><strong>Address:</strong> {appointment.property.address}</p>
                        <p><strong>City:</strong> {appointment.property.city}</p>
                        <p><strong>Area:</strong> {appointment.property.area}</p>
                        <p><strong>Price:</strong> ${appointment.property.price}</p>
                        <p><strong>Description:</strong> {appointment.property.description}</p>
                        <a href={appointment.property.googleMap} target="_blank" rel="noopener noreferrer">View on Google Maps</a> */}
                    </div>
                </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No appointments found for this property.</p>
        )}
      </div>
      <div className='container mt-3'>
          <div className='row justify-content-center'>
            <div className='col-auto'>
              <button className="btn btn-secondary btn-lg viewAppointment" onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
