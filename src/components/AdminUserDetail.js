import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function AdminUserDetail() {
  const [user, setUser] = useState(null); // Changed to null to handle an object
  const [searchParams] = useSearchParams();
  const query = parseInt(searchParams.get("q"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:9999/user/all');
        console.log('API Response:', response.data); // Log the full API response
        const filtereduser = response.data.find(
          (user) => user.userId === query
        );
        console.log('Filtered User:', filtereduser); // Log the filtered user
        setUser(filtereduser || null); // Set to null if not found
        
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };

    fetchUser();
  }, [query]); // Included `query` in the dependency array

  if (!user) {
    return <div className="container custom-container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container custom-container mt-5">
      <h2 className="text-center mb-4">User Details</h2>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>User ID:</strong></div>
        <div className="col-sm-6">{user.userId}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>First Name:</strong></div>
        <div className="col-sm-6">{user.firstName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Last Name:</strong></div>
        <div className="col-sm-6">{user.lastName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Email:</strong></div>
        <div className="col-sm-6">{user.email}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Phone Number:</strong></div>
        <div className="col-sm-6">{user.phoneNo}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Address:</strong></div>
        <div className="col-sm-6">{user.address}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>City:</strong></div>
        <div className="col-sm-6">{user.city}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>State:</strong></div>
        <div className="col-sm-6">{user.state}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Pincode:</strong></div>
        <div className="col-sm-6">{user.pincode}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Username:</strong></div>
        <div className="col-sm-6">{user.userName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Password:</strong></div>
        <div className="col-sm-6">{user.password}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Created At:</strong></div>
        <div className="col-sm-6">{user.createdAt}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6"><strong>Updated At:</strong></div>
        <div className="col-sm-6">{user.updatedAt || 'N/A'}</div>
      </div>
    </div>
  );
}
