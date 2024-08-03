import React from 'react';

export default function ContactUs() {
    return (
        <div className='contactUs'>
            <div className="bg-dark text-white text-center py-3">
                <h1>Contact Us</h1>
            </div>

            <div className="container contact-section mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-info">
                            <h2>Contact Information</h2>
                            <p><strong>Address:</strong> 123 Real Estate St, Cityville, ST 12345</p>
                            <p><strong>Phone:</strong> (123) 456-7890</p>
                            <p><strong>Email:</strong> <a href="mailto:info@realestate.com">info@realestate.com</a></p>
                        </div>

                        <h2>Send Us a Message</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h2>Our Location</h2>
                        <div className="map">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29986.467324506735!2d73.85012979999999!3d20.03752045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddc1ead1b324ef%3A0x8d92c1a2d458e703!2sAdgaon%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1722497122806!5m2!1sen!2sin" 
                                width="100%" 
                                height="400" 
                                style={{ border: 0 }}
                                allowFullScreen 
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
