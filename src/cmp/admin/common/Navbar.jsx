import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Navbar = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [companyName, setCompanyName] = useState('Multi Vendor E Commerce');

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Handle password update logic here
    setMessage('Password updated successfully');
  };

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div id="setloader"></div>

      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light sticky-top">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                <i className="fas fa-bars"></i>
              </Link>
            </li>
          </ul>
          <marquee behavior="alternate" scrollamount="1">
            <h5 className="font-weight-bold text-dark">{companyName}</h5>
          </marquee>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" data-widget="fullscreen" to="#" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </Link>
            </li>
            <li className="nav-item dropdown no-arrow">
              <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginTop: '-5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ textTransform: 'capitalize' }}>
                 Aman Kumar
                </span>
                <img src="dist/img/dummy_profile.jpg" style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #fff' }} alt="Profile" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="/UpdateProfile">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </Link>
                <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#social_links">
                  <i className="fa fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
                  Social Links
                </Link>
                <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#chang_password">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Change Password
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="logout.html?submit=logout">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        {/* Change Password Modal */}
  <section className="content">
		<div className="container-fluid">
			<div className="row">
        <div className="modal fade" id="chang_password" tabIndex="-1" role="dialog" aria-labelledby="chang_passwordLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="col-sm-12 text-center mb-2">
                  <img src="path/to/profile_picture.jpg" style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #fff' }} alt="Profile" />
                </div>
                <div className="col-sm-12">
                  <h5 className="ml-4"><i className="fas fa-envelope text-success"></i> PLEASE FILL CAREFULLY DETAILS HERE!</h5>
                </div>
                <form className="form-horizontal" onSubmit={handlePasswordSubmit}>
                  <div className="card-body">
                    <div className="form-group position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="p_current_password"
                        className="form-control"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <i
                        className="fa fa-eye p-show-icon"
                        style={{ fontSize: '18px' }}
                        onClick={handlePasswordToggle}
                      ></i>
                    </div>
                    <div className="form-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="p_new_password"
                        className="form-control"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="p_confirm_password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input type="hidden" name="a_id" value="user_id" />
                    </div>
                    <div className="form-group">
                      <input type="submit" className="btn form-control" style={{ backgroundColor: 'yellowgreen', color: 'white' }} value="Update Password" />
                      <span id="message">{message}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>
        {/* Social Links Modal */}
    <section className="content">
		<div className="container-fluid">
			<div className="row">
        <div className="modal fade" id="social_links" tabIndex="-1" role="dialog" aria-labelledby="social_linksLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="col-sm-12 text-center mb-2">
                  <img src="https://amanyasoftech.com/admin/upload/profile_images/5.jpg" style={{ width: '80px', height: '80px', borderRadius: '50%' }} alt="Profile" />
                </div>
                <div className="col-sm-12">
                  <h5 className="ml-4"><i className="fas fa-envelope text-success"></i> PLEASE FILL CAREFULLY DETAILS HERE!</h5>
                </div>
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-phone-alt" style={{ color: 'green' }}></i></span>
                      </div>
                      <input type="tel" className="form-control" placeholder="Professional Phone Number" name="phone" maxLength="10" minLength="10" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-phone-alt" style={{ color: 'green' }}></i></span>
                      </div>
                      <input type="tel" className="form-control" placeholder="Secondary Phone Number" name="secondry_phone" maxLength="10" minLength="10" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope" style={{ color: 'red' }}></i></span>
                      </div>
                      <input type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope" style={{ color: 'red' }}></i></span>
                      </div>
                      <input type="email" className="form-control" name="professional_email" placeholder="Professional Email" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i></span>
                      </div>
                      <input type="tel" className="form-control" name="whatsapp_number" placeholder="WhatsApp Number" minLength="10" maxLength="10" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-google" style={{ color: '#EA4335' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="google_map" placeholder="Google Map" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-facebook-square" style={{ color: '#4267B2' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="facebook" placeholder="Facebook" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-youtube" style={{ color: '#FF0000' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="youtube" placeholder="YouTube" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-instagram" style={{ color: 'red' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="instagram" placeholder="Instagram" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-twitter" style={{ color: '#1DA1F2' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="twitter" placeholder="Twitter" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fab fa-linkedin" style={{ color: '#1293d2' }}></i></span>
                      </div>
                      <input type="url" className="form-control" name="linkedin" placeholder="LinkedIn" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-map-marker" style={{ color: '#1293d2' }}></i></span>
                      </div>
                      <textarea className="form-control" name="company_address" placeholder="Main Address" defaultValue="Main Address"></textarea>
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-map-marker" style={{ color: '#1293d2' }}></i></span>
                      </div>
                      <textarea className="form-control" name="branch_address" placeholder="Branch Address">Branch Address</textarea>
                    </div>
                    <div className="form-group">
                      <input type="hidden" className="form-control" name="user_id" value="1" />
                    </div>
                    <div className="form-group">
                      <input type="submit" name="update_social" className="btn form-control" style={{ backgroundColor: 'yellowgreen', color: 'white' }} value="Update Social Links" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  </section>
      </div>
    </div>
  );
};

export default Navbar;
