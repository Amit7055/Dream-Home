import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Appointment() {
  const navigate = useNavigate();
  const { getUserId } = useContext(AuthContext);
  const appointmentBooker = getUserId();
  const [image, setImage] = useState(null);
  const [property, setProperty] = useState([]);
  const [user, setUser] = useState([]);
  const [date, setDate] = useState();
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const bookingPropertyId = parseInt(searchParams.get("q"));

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/properties/getproperty/${bookingPropertyId}`
        );
        setProperty(response.data)

        const responseUser = await axios.get(
          `http://localhost:9999/user/getUser/${appointmentBooker}`
        );
        setUser(responseUser.data);

        // Fetch property image
        const imageResponse = await axios.get(
          `http://localhost:9999/api/images/property/${bookingPropertyId}`
        );
        const imageData = imageResponse.data[0];
        if (imageData) {
          const base64Image = imageData.imageAsBase64 || imageData.imagedata;
          setImage(
            base64Image ? `data:image/jpeg;base64,${base64Image}` : null
          );
        }
      } catch (error) {
        console.error("There was an error fetching the property!", error);
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
      phoneNo: user.phoneNo,
      purpose: message, // Assuming 'purpose' is filled with the message content
      status: "Scheduled",
      details: `Meeting to discuss property details at ${property?.address}`,
      user: { userId: appointmentBooker },
      property: { propertyId: bookingPropertyId },
    };

    try {
      await axios.post("http://localhost:9999/appointment/add", appointment);
      toast.success('Appointment request sent successfully and you will confirmation shortly !!!', {
        className: 'custom-toast-success',
      });
    } catch (error) {
      console.error("There was an error booking the appointment!", error);
      toast.warning("There was an error booking the appointment!.", {
        className: 'custom-toast-warning',
      });
    }
  };

  return (
    <div>
      <div className="container options-row text-center">
      <ToastContainer position="top-center" />
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
      <div className="container mt-5 appointment ">
        <h1
          className="text-center mb-5 bg-warning text-light"
          style={{height: `70px` , paddingTop:`10px` }}
        >
          Appointment Form
        </h1>
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card bg-info-subtle">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0 text-center" style={{height: `50px` , paddingTop:`10px` }}>Your Details</h2>
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
                        value={user.firstName +" "+ user.lastName}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={user.email}
                        readOnly
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
                        value={user.phoneNo}
                        readOnly
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
                    <div className="card-header bg-info text-white mb-3">
                      <h2 className="mb-0 text-center">Property of Interest</h2>
                    </div>
                    <div className="container">
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
                                    alt={property.propertyType}
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
                              <h3>Property Details</h3>
                            </div>
                            <div className="card-body bg-primary-subtle">
                              <div className="container">
                                <div className="row">
                                  <div className="form-group col-md-12">
                                    <label>Property Type:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={property.propertyType}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="form-group">
                                      <label>Address:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.address}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4">
                                    <div className="form-group">
                                      <label>Area:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.area}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4">
                                    <div className="form-group">
                                      <label>City:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.city}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4">
                                    <div className="form-group">
                                      <label>State:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.state}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="form-group">
                                      <label>Description:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.description}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="form-group">
                                      <label>Number of Bedroom:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.bedroom}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="form-group">
                                      <label>Number of Bathroom:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.bathroom}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="form-group">
                                      <label>Size:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.size + " sq foot"}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="form-group">
                                      <label>Year Built:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={property.yearBuilt}
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
                                        value={"$" + property.price}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="form-group">
                                      <label>Google Map URL:</label>
                                      <p>
                                        <a
                                          href={property.googleMap}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Map
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
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
                    <div className="col-xl-12">
                      <div
                        className="buttons container text-center"
                        style={{ marginTop: "20px" }}
                      >
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
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
