import React from 'react'

export default function Tenant() {
    return (
        <div>
            <div className="container custom-container my-4">
                {/* Property Details Section */}
                <div id="property-details" className="card unique-card mb-4">
                    <div className="card-body">
                        <h2 className="card-title unique-card-title">Property Details</h2>
                        <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
                        <p><strong>Unit Number:</strong> 45A</p>
                        <p><strong>Lease Term:</strong> 12 months</p>
                        <p><strong>Monthly Rent:</strong> $1,200</p>
                    </div>
                </div>

                {/* Maintenance Request Form */}
                <div id="maintenance-form" className="card unique-card mb-4">
                    <div className="card-body">
                        <h2 className="card-title unique-card-title">Rental Portal</h2>
                        <form action="submit_maintenance_request.php" method="post">
                            <div className="form-group">
                                <label htmlFor="name">Your Name:</label>
                                <input type="text" id="name" name="name" className="form-control unique-form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email:</label>
                                <input type="email" id="email" name="email" className="form-control unique-form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="issue">Request Maintenance:</label>
                                <textarea id="issue" name="issue" className="form-control unique-form-control" required></textarea>
                            </div>
                            {/* Rent Time Period Fields */}
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="form-group">
                                        <label htmlFor="rent-start">Rent Start Date:</label>
                                        <input type="date" id="rent-start" name="rent-start" className="form-control unique-date-input" required />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="form-group">
                                        <label htmlFor="rent-end">Rent End Date:</label>
                                        <input type="date" id="rent-end" name="rent-end" className="form-control unique-date-input" required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn unique-btn">Submit Request</button>
                        </form>
                    </div>
                </div>

                {/* Contact Information */}
                <div id="contact-info" className="card unique-card">
                    <div className="card-body">
                        <h2 className="card-title unique-card-title">Contact Information</h2>
                        <p><strong>Property Manager:</strong> Jane Doe</p>
                        <p><strong>Email:</strong> manager@example.com</p>
                        <p><strong>Phone:</strong> (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
