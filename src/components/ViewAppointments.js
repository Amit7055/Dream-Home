import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [image, setImage] = useState(null);
  const [searchParams] = useSearchParams();
  const appointmentProperty = parseInt(searchParams.get("a"), 10);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) for navigation
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/appointment/all"
        );
        const filteredAppointments = response.data.filter(
          (appointment) =>
            appointment.property.propertyId === appointmentProperty
        );
        setAppointments(filteredAppointments);

        const imageResponse = await axios.get(
          `http://localhost:9999/api/images/property/${appointmentProperty}`
        );
        const imageData = imageResponse.data[0];
        if (imageData) {
          const base64Image = imageData.imageAsBase64 || imageData.imagedata;
          setImage(
            base64Image ? `data:image/jpeg;base64,${base64Image}` : null
          );
        }
      } catch (error) {
        console.error("There was an error fetching the appointments!", error);
      }
    };

    fetchAppointments();
  }, [appointmentProperty]); // Dependency array includes appointmentProperty

  return (
    <>
      <div className="container options-row text-center">
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/rent`)}
            >
              Rental Section
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy`)}
            >
              Buy Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/seller`)}
            >
              Sell Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/landlordtenant`)}
            >
              Landlord/Tenant
            </button>
          </div>
        </div>
      </div>
      <div className="container custom-container mt-5">
        <div className="card-header text-center bg-warning text-light">
          <h1 className="text-center mb-5">View Appointments</h1>
        </div>
        <div >
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.appointmentId} className="list-group-item">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="card bg-secondary-subtle">
                      <div className="container">
                        <div className="row">
                          <div className="card-header text-center text-white bg-info">
                            <strong>
                              <h3>Property Image</h3>
                            </strong>
                          </div>
                          {image ? (
                            <img
                              src={image}
                              alt={appointment.property.propertyType}
                              className="mt-5 mb-5 ml-4 mr-4"
                              style={{ width: `90%`, height: `90%` }}
                            />
                          ) : (
                            <p>
                              <h3>No image available</h3>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header text-center text-white bg-info">
                        <h3>Appointment Details</h3>
                      </div>
                      <div className="card-body bg-primary-subtle">
                        <div className="container">
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label>Appointment ID:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.appointmentId}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Appointment Date:</label>
                              <input
                                type="Date"
                                className="form-control"
                                value={appointment.appointmentDate}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Appointment Time:</label>
                              <input
                                type="Time"
                                className="form-control"
                                value={appointment.appointmentTime}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Appointment Details:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.details}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Appointment Status:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.status}
                                readOnly
                              />
                            </div>
                            <div className="card-header text-center text-white bg-info mb-2">
                              <h3>Property Details</h3>
                            </div>
                            <div className="form-group col-md-12">
                              <label>Property Type:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.property.propertyType}
                                readOnly
                              />
                            </div>
                            <div className="col-xl-12">
                              <div className="form-group">
                                <label>Address:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={
                                    appointment.property.address +
                                    " , " +
                                    appointment.property.area +
                                    " ,  " +
                                    appointment.property.city +
                                    " , " +
                                    appointment.property.state
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="form-group">
                                <label>Price:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={"$" + appointment.property.price}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="form-group">
                                <label>Google Map URL:</label>
                                <p>
                                  <a
                                    href={appointment.property.googleMap}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Map
                                  </a>
                                </p>
                              </div>
                            </div>
                            {appointment.property.type === "buyer" && (
                              <div className="card-header text-center text-white bg-info">
                                <h3>Potential Buyer</h3>
                              </div>
                            )}
                            {appointment.property.type === "rent" && (
                              <div className="card-header text-center text-white bg-info mb-2">
                                <h3>Potential Renter</h3>
                              </div>
                            )}
                            <div className="form-group col-md-12">
                              <label>Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={
                                  appointment.user.firstName +
                                  " " +
                                  appointment.user.lastName
                                }
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>E-mail Address:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.user.email}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone Number:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={appointment.user.phoneNo}
                                readOnly
                              />
                            </div>
                            <div
                              className="buttons"
                              style={{ marginTop: "20px" }}
                            >
                              <button
                                className="btn btn-secondary"
                                onClick={handleBack}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>No appointments found for this property.</p>
          )}
        </div>
      </div>
    </>
  );
}
