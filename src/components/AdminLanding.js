import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLanding() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/user/all');
                setUsers(response.data);
                console.log(response.data); // Log the fetched data instead of the state
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('An error occurred. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <div className="container custom-container mt-5 text-center">
                <h2 className="text-center">User List</h2>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">UserId</th>
                                <th scope="col">UserName</th>
                                <th scope="col">E-mail Id</th>
                                {/* <th scope="col">Status</th> */}
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} className="table-warning mt-5">
                                    <th scope="row">{user.userId}</th>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user.status}</td> */}
                                    <td className="mt-5">
                                        <button className="btn btn-primary">Delete</button>
                                        <button className="btn btn-primary ms-2" onClick={() => {
                                        navigate(`/adminuser?q=${user.userId}`);
                                        }}>Details</button>
                                        {/* <button className="btn btn-primary ms-2">Block</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
