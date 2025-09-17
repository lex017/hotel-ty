import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = {
    name: "John Doe go don bur",
    avatar:
      "https://plus.unsplash.com/premium_photo-1755105197531-cfa38d566b8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExMXx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8",
  };

  // Close menu if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="nav-success">
      <Link to="/home" className="nav-logo">
        Booking.com
      </Link>
      <div className="nav-right" ref={dropdownRef}>
        <div className="user-info" onClick={() => setIsOpen((prev) => !prev)}>
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <Link to="/report" className="dropdown-item">
              Report
            </Link>
            <button onClick={handleLogout} className="dropdown-item logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavAdmin;
