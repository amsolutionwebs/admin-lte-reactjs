import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const AllPages = () => {
  const [servicesListings, setServicesListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint for fetching pages
    axios.get('https://amanyademo.in.net/e_vendor_app/api/get-all-service-listing') // Adjust URL as needed
      .then(response => {
        // Access the ServicesListings array from the response
        setServicesListings(response.data.ServicesListings);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (

    <>
       <Navbar />
       <Sidebar />
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-2 px-1" style={{ borderTop: '3px solid tomato' }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-1">
                      <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'tomato', borderRadius: '50%', width: '50px', height: '50px', textAlign: 'center' }}>
                        <Link to="/add_pages">
                          <i className="fas fa-plus" style={{ fontSize: '30px', color: '#fff' }}></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-11">
                      <h5>All Pages</h5>
                      <span>Total: {servicesListings.length}</span>
                    </div>
                  </div>
                  <table id="example2" className="table table-bordered">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Job Profile</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesListings.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.job_profile}</td>
                          <td>{item.status}</td>
                          <td>
                            <Link to={`/add_pages?post=${item.id}&action=update`}>
                              <button className='btn btn-xs btn-warning mr-2 p-2'>
                                <i className='fas fa-edit'></i>
                              </button>
                            </Link>
                            <a href={`/pages_action?post=${item.id}&action=delete`} onClick={(e) => {
                              if (!window.confirm('Are you sure you want to delete?')) {
                                e.preventDefault();
                              }
                            }}>
                              <button className='btn btn-xs btn-danger p-2'>
                                <i className='fas fa-trash'></i>
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AllPages;
