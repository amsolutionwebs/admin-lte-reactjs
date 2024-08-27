import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import axios from 'axios';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const Dashboard = () => {

  const title = "My Dynamic Page Title";


  const [userType, setUserType] = useState('admin'); // This should be set according to user context
  const [data, setData] = useState({
    adminCount: 0,
    storeCount: 0,
    userTypeCount: 0,
    employeeCount: 0
  });

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

  return (
    <div>
       <Helmet>
        <title>{title}</title>
      </Helmet>
    
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 font-weight-bold text-dark">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {userType === 'suparadmin' && (
                <div className="col-lg-4 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{data.adminCount}</h3>
                      <p>TOTAL ADMIN</p>
                    </div>
                    <div className="icon">
                      <i><img src="/dist/img/attendence.png" width="40%" alt="Admin Icon" /></i>
                    </div>
                    <a href="/admin_list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
              )}

              {userType === 'admin' && (
                <>
                  <div className="col-lg-4 col-6">
                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>{data.storeCount}</h3>
                        <p>TOTAL STORE</p>
                      </div>
                      <div className="icon">
                        <i><img src="/dist/img/insurance.png" width="30%" alt="Store Icon" /></i>
                      </div>
                      <a href="/store_list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                  </div>

                  <div className="col-lg-4 col-6">
                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>{data.userTypeCount}</h3>
                        <p>TOTAL USER TYPE</p>
                      </div>
                      <div className="icon">
                        <i><img src="/dist/img/attendence.png" width="35%" alt="User Type Icon" /></i>
                      </div>
                      <a href="/user_type_list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                  </div>

                  <div className="col-lg-4 col-6">
                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{data.employeeCount}</h3>
                        <p>TOTAL EMPLOYEE</p>
                      </div>
                      <div className="icon">
                        <i><img src="/dist/img/enquiry_list.png" width="60%" alt="Employee Icon" /></i>
                      </div>
                      <a href="/employee_list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
