import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] = useState('');


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/appointment/all`);
        setAppointments(response.data);
      } catch (error) {
        console.error('There was an error fetching the appointments!', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdate = (appointment) => {
    axios.put(`http://localhost:9999/appointment/update/${appointment.appointmentId}`, appointment)
      .then(response => {
        alert("Appointment updated successfully!");
        // Optionally, refetch the appointment details
      })
      .catch(error => {
        console.error("There was an error updating the appointment!", error);
        alert("Failed to update appointment.");
      });
  };

  if (!appointments.length) return(
    <div className='container custom-container'>
      <h1>No appointments found.</h1>
    </div>
  )

  return (
    <div>
      {appointments.map(appointment => (
        <div key={appointment.appointmentId} className='custom-container mt-5 container'>
          <div className="card">
            <div className="card-header text-center">
              <h1>Appointment Details</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Appointment Date:</label>
                <div className="col-sm-8">{appointment.appointmentDate}</div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Appointment Time:</label>
                <div className="col-sm-8">
                  <input
                    type="time"
                    value={appointment.appointmentTime}
                    onChange={(e) => {
                      const updatedAppointment = { ...appointment, appointmentTime: e.target.value };
                      setAppointments(appointments.map(a => a.appointmentId === appointment.appointmentId ? updatedAppointment : a));
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Phone Number:</label>
                <div className="col-sm-8">{appointment.phoneNo}</div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Purpose:</label>
                <div className="col-sm-8">{appointment.purpose}</div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Status:</label>
                <div className="col-sm-8">
                  <select
                    value={appointment.status}
                    onChange={(e) => {
                      const updatedAppointment = { ...appointment, status: e.target.value };
                      setAppointments(appointments.map(a => a.appointmentId === appointment.appointmentId ? updatedAppointment : a));
                    }}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 font-weight-bold">Details:</label>
                <div className="col-sm-8">{appointment.details}</div>
              </div>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      User Details
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">First Name:</label>
                        <div className="col-sm-8">{appointment.user.firstName}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Last Name:</label>
                        <div className="col-sm-8">{appointment.user.lastName}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Email:</label>
                        <div className="col-sm-8">{appointment.user.email}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Phone Number:</label>
                        <div className="col-sm-8">{appointment.user.phoneNo}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Address:</label>
                        <div className="col-sm-8">{appointment.user.address}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">City:</label>
                        <div className="col-sm-8">{appointment.user.city}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">State:</label>
                        <div className="col-sm-8">{appointment.user.state}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Pincode:</label>
                        <div className="col-sm-8">{appointment.user.pincode}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      Property Details
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Property Type:</label>
                        <div className="col-sm-8">{appointment.property.propertyType}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Google Map:</label>
                        <div className="col-sm-8">{appointment.property.googleMap}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Address:</label>
                        <div className="col-sm-8">{appointment.property.address}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Area:</label>
                        <div className="col-sm-8">{appointment.property.area}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">City:</label>
                        <div className="col-sm-8">{appointment.property.city}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">State:</label>
                        <div className="col-sm-8">{appointment.property.state}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Price:</label>
                        <div className="col-sm-8">{appointment.property.price}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Description:</label>
                        <div className="col-sm-8">{appointment.property.description}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Bedroom:</label>
                        <div className="col-sm-8">{appointment.property.bedroom}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Bathroom:</label>
                        <div className="col-sm-8">{appointment.property.bathroom}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Size:</label>
                        <div className="col-sm-8">{appointment.property.size}</div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4 font-weight-bold">Year Built:</label>
                        <div className="col-sm-8">{appointment.property.yearBuilt}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary" onClick={() => handleUpdate(appointment)}>Update Appointment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// export default AdminAppointment;