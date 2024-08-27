import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { bgImages } from './utils/backgroundImages';

import './Loginform.css';

    

function ForgotPassword() {
    const navigate = useNavigate();
  
    useEffect(() => {
        const number = Math.floor(Math.random() * bgImages.length);
        document.body.style.backgroundImage = `url(dist/bg-img/${bgImages[number]})`;
      }, []);


    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        // For example, you can make an API call here
        navigate('/submit-otp');
      };

  return (
    <div className="App">
      <section className="login_section bg_image">
        {/* Include message component if needed */}
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-4" style={{ marginTop: '50px' }}>
              <div className="logo d-flex justify-content-center align-items-center">
                <h1 style={{ fontWeight: 'bolder', color: '#fff', textShadow: '3px 2px black' }}>
                  <i className="fa fa-gear fa-spin"></i> ADMIN PANEL
                </h1>
              </div>
              <div className="login-panel panel panel-default text-center">
                <img
                  src="dist/img/enquiry.png"
                  className="img-responsive center-block rounded-circle mb-4"
                  alt="Logo"
                  width="100px"
                  style={{ borderRadius: '50%', border: '1px solid #ccc',padding:3 }}
                />
                <div className="panel-body text-center">
                <form className="form-signin" onSubmit={handleSubmit}>
      <fieldset>
       

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username or Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            title="Please Enter Email"
            required
          />
        </div>

       

        <button className="btn btn-success btn-block" type="submit">
         Send Otp
        </button>
        
      </fieldset>
    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
