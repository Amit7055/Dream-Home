import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <div className="row">
          {/* Company Information */}
          <div className="col-md-4 mb-3">
            <h3>Dream Home</h3>
            <p>Enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis sed aute irure.</p>
            <p><strong>Phone:</strong> +54 356 945234</p>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Address:</strong> 123 Dream St, Imaginary City, Country</p>
          </div>
          {/* Quick Links */}
          <div className="col-md-4 mb-3 text-center">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#services" className="text-white">Services</a></li>
              <li><a href="#about" className="text-white">About Us</a></li>
              <li><a href="#properties" className="text-white">Properties</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="col-md-4 mb-3 text-center">
            <h3>Follow Us</h3>
            <a href="#" className="text-white mr-3"><i className="fab fa-facebook-f"></i> Facebook</a><br />
            <a href="#" className="text-white mr-3"><i className="fab fa-twitter"></i> Twitter</a><br />
            <a href="#" className="text-white mr-3"><i className="fab fa-instagram"></i> Instagram</a><br />
            <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
          </div>
        </div>
      </div>
      <hr className="bg-white" />
      <p>&copy; 2024 Dream Home. All rights reserved.</p>
    </footer>
  );
}
