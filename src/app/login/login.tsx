import React, { useState } from "react";
import HeadNav from "./headNav";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: (role: "user" | "admin") => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔹 Fake check — replace with real API / Firebase later
    let role: "user" | "admin" = "user";

    if (email === "admin@booking.com" && password === "admin123") {
      role = "admin";
    }

    // send role back
    onLoginSuccess(role);

    // redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="rg-main">
      <HeadNav />
      <div className="rg-content">
        <div className="rg-text1">
          <h3>Sign in or create an account</h3>
          <h5>
            You can sign in using your Booking.com account to access our
            services.
          </h5>
        </div>
        <div className="rg-input">
          <input
            type="text"
            placeholder="Enter Your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="rg-btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
