import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bgImages } from './utils/backgroundImages';
import './Loginform.css';

function SubmitOtp() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const number = Math.floor(Math.random() * bgImages.length);
        document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/dist/bg-img/${bgImages[number]})`;
    }, []);

    const [formData, setFormData] = useState({
        otp: '', // Initialize with an empty string
    });
    
    const handleChange = (e) => {
        const { name, value: inputValue } = e.target;
        
        // Validate and clean the input value
        const cleanedValue = inputValue.replace(/\D/g, '');

        if (inputValue !== cleanedValue) {
            // Show alert if the cleaned value is different from the input value
            alert("Sorry! Only numbers are allowed.");
        }

        // Always update the state with cleaned value
        setFormData({
            ...formData,
            [name]: cleanedValue,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        navigate('/change-password');
    };

    return (
        <div className="App">
            <section className="login_section bg_image">
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
                                                    placeholder="Enter Six digit OTP code"
                                                    name="otp"
                                                    type="text"
                                                    value={formData.otp || ''} // Ensure controlled value
                                                    onChange={handleChange}
                                                    title="Please Enter OTP"
                                                    minLength={6}
                                                    maxLength={6}
                                                    required
                                                />
                                            </div>
                                            <button className="btn btn-success btn-block" type="submit">
                                                Submit OTP
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

export default SubmitOtp;
