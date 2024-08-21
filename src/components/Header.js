import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const { isLoggedIn, logout ,isAdminLoggedIn,adminLogout} = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(true);

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        logout();
        setCollapsed(true); // Close the navbar after logout
    };

    const handleAdminLogout = () => {
        adminLogout();
        setCollapsed(true); // Close the navbar after logout
    };

    if(isAdminLoggedIn){
        return(
            <div className=" text-center">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Dream Home</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={handleToggleCollapse}
                        aria-controls="navbarNav"
                        aria-expanded={!collapsed ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin" onClick={handleToggleCollapse}>User List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/adminproperty" onClick={handleToggleCollapse}>Property List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/adminappointment" onClick={handleToggleCollapse}>Appointment</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/adminprofile" onClick={handleToggleCollapse}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/' onClick={() => { handleAdminLogout(); }}>Logout</Link>
                                    </li>
                                </>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
        );
    }

    return (
        <div className=" text-center">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Dream Home</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={handleToggleCollapse}
                        aria-controls="navbarNav"
                        aria-expanded={!collapsed ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home" onClick={handleToggleCollapse}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard" onClick={handleToggleCollapse}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" onClick={handleToggleCollapse}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/' onClick={() => { handleLogout(); }}>Logout</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/" onClick={handleToggleCollapse}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#services" onClick={handleToggleCollapse}>Services</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#about" onClick={handleToggleCollapse}>About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#properties" onClick={handleToggleCollapse}>Properties</a>
                                    </li>
                                    <li className="nav-item">
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Login
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-dark">
                                                <li><a className="nav-link" href="adminlogin" onClick={handleToggleCollapse}>Login as Admin</a></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li><a className="nav-link" href="login" onClick={handleToggleCollapse}>Login as User</a></li>
                                            </ul>
                                        </div>

                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="register" onClick={handleToggleCollapse}>Register</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}
