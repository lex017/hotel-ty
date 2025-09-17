import React from 'react';
import HeadNav from './headNav';

function Register() {
  return (
    <div className="rg-main">
      < HeadNav/>
      <div className="rg-content">
        <div className="rg-text1">
          <h3>Sign in or create an account</h3>
          <h5>You can sign in using your Booking.com account to access our services.</h5>
        </div>
        <div className="rg-input">
          <input type="text" placeholder="Enter Your FirstName" />
          <input type="text" placeholder="Enter Your LastName" />
          <input type="text" placeholder="Enter Your Username" />
          <input type="text" placeholder="Enter Your Email address" />
          <input type="password" placeholder="Enter Your Password" />
          <input type="text" placeholder="Enter Your Country" />
          <input type="date" />
          <select name="gender">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <a  className="rg-btn">
                    Register
                  </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
