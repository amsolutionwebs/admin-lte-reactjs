import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bgImages } from './utils/backgroundImages';
import './Loginform.css';

function ChangePassword() {
    const navigate = useNavigate();

    useEffect(() => {
        const number = Math.floor(Math.random() * bgImages.length);
        document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/dist/bg-img/${bgImages[number]})`;
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate password and confirm password match
    

         // Validate password and confirm password match
         if (name === 'confirm_password') {
            if (value === formData.password) {
                setError('Match');
            } else {
                setError('Not Matching');
            }
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation check
        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match!');
            return;
        }

        // Handle form submission, e.g., API call
        navigate('/');
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
                                                    placeholder="Password"
                                                    name="password"
                                                    type="text"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    title="Please Enter Password"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                    name="confirm_password"
                                                    type="password"
                                                    value={formData.confirm_password}
                                                    onChange={handleChange}
                                                
                                                    title="Please Enter Confirm Password"
                                                    required
                                                />
                                                
                                            </div>
                                            <button className="btn btn-success btn-block" type="submit">
                                                Change Password
                                            </button>
                                            {error &&
                                            <span className='text-left float-left'>{error}</span>
                                        }
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

export default ChangePassword;
