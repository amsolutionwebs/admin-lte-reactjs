import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const UpdateProfile = () => {
  const [userType, setUserType] = useState('admin'); // This should be set according to user context
  const [data, setData] = useState({
    adminCount: 0,
    storeCount: 0,
    userTypeCount: 0,
    employeeCount: 0
  });
  const [address, setAddress] = useState('azamgarh'); // Added state for address

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        // Replace these with actual API calls
        // const [adminRes, storeRes, userTypeRes, employeeRes] = await Promise.all([
        //   axios.get('/api/admin-count'),
        //   axios.get('/api/store-count'),
        //   axios.get('/api/user-type-count'),
        //   axios.get('/api/employee-count')
        // ]);

        setData({
          adminCount: 5,
          storeCount: 5,
          userTypeCount: 5,
          employeeCount: 5
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleFileChange = (event) => {
    // Handle file input changes
    const file = event.target.files[0];
    if (file) {
      // You can implement file preview logic here
      console.log('Selected file:', file);
    }
  };

  const validateNumberInput = (event) => {
    // Example validation logic for numeric inputs
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/[^\d]/g, '');
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h4 className="m-0"><i className="fas fa-user text-success"></i> UPDATE PROFILES HERE !</h4>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="https://mobile.amanyademo.in.net/">Home</a></li>
                  <li className="breadcrumb-item active">Update Profile</li>
                </ol>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <section className="content">
          <div className="container-fluid">
            <form className="update_profile" method="post" encType="multipart/form-data" action="profile_action.php">
              <div className="row border mb-3 p-4" style={{ backgroundColor: '#fff' }}>
                <div className="col-md-12 d-flex justify-content-center">
                  <div className="profile-pic avatar-wrapper" style={{ height: '200px', width: '200px', borderRadius: '50%', border: '1px solid #ddd' }}>
                    <img
                      src="https://mobile.amanyademo.in.net/upload/profile_images/16341722579449stendra.jpg"
                      id="output1"
                      alt="Profile"
                      style={{ width: '100%', border: '7px solid #fff', borderRadius: '50%', height: '200px' }}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Choose Profile Pic</label>
                    <input type="file" name="profile_image" className="form-control" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Employee Id</label>
                    <input type="text" name="employee_id" placeholder="Employee Id" className="form-control" value="EMP0000-01" readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" placeholder="First Name" className="form-control" value="Aman" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" placeholder="Last Name" className="form-control" value="Kumar" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email Id</label>
                    <input type="email" name="email_id" placeholder="example@mail.com" className="form-control" value="admin@gmail.com" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      className="form-control"
                      value="7052416399"
                      maxLength="10"
                      minLength="10"
                      required
                      onChange={validateNumberInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Alternate Mobile Number</label>
                    <input
                      type="text"
                      name="alternate_phone"
                      placeholder="Alternate Phone Number"
                      className="form-control"
                      value="7607046985"
                      maxLength="10"
                      minLength="10"
                      onChange={validateNumberInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Whatsapp Number</label>
                    <input
                      type="text"
                      name="whatsapp_number"
                      placeholder="Whatsapp Number"
                      className="form-control"
                      value="7052416399"
                      maxLength="10"
                      minLength="10"
                      onChange={validateNumberInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      className="form-control"
                      value="25"
                      maxLength="2"
                      minLength="2"
                      required
                      onChange={validateNumberInput}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={address}
                      onChange={handleAddressChange}
                      rows="2" // Changed to use rows prop for textarea
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input type="submit" name="update_profile" className="btn form-control" style={{ backgroundColor: 'yellowgreen', color: 'white' }} value="Update Profile" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
