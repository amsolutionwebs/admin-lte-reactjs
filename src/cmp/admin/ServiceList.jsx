import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL_TWO } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const ServiceList = () => {
  const [services, setServices] = useState([]); // Renamed to 'services'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://amanyademo.in.net/e_vendor_app/api/get-all-service-listing');
        if (response.data.status) {
          setServices(response.data.ServicesListings); // Updated to 'ServicesListings'
        } else {
          setError('Failed to fetch services.');
        }
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching services.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL_TWO}/delete-service/${id}`); // Updated endpoint
        setServices(services.filter((item) => item.id !== id));
      } catch (error) {
        setError('Failed to delete service. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    // Redirect to the update route
    navigate(`/add-service/${id}`); // Updated route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                    <div className="row mb-3">
                      <div className="col-1">
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'tomato', borderRadius: '50%', width: '50px', height: '50px', textAlign: 'center' }}>
                          <Link to="/add-service">
                            <i className="fas fa-plus" style={{ fontSize: '30px', color: '#fff' }}></i>
                          </Link>
                        </div>
                      </div>
                      <div className="col-11">
                        <h5>All Services</h5> {/* Updated title */}
                        <span>Total: {services.length}</span>
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
                        {services.map((service, index) => (
                          <tr key={service.id}>
                            <td>{index + 1}</td>
                            <td>{service.job_profile}</td> {/* Updated field */}
                            <td>{service.status}</td>
                            <td>
                              <button
                                className="btn btn-xs btn-warning mr-2 p-2"
                                onClick={() => handleEdit(service.id)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-xs btn-danger p-2"
                                onClick={() => handleDelete(service.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
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

export default ServiceList;
