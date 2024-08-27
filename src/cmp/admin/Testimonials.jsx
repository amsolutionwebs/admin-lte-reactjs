import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const Testimonials = () => {
  const [servicesListings, setServicesListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/testimonials`);
        setServicesListings(response.data.testimonials);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${API_BASE_URL}/testimonials/${id}`);
        setServicesListings(servicesListings.filter((item) => item.id !== id));
      } catch (error) {
        setError(error);
        alert('Failed to delete testimonial. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    // Redirect to the update route
    navigate(`/add-testimonials/${id}`);
  };

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
                    <div className="row mb-3">
                      <div className="col-1">
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'tomato', borderRadius: '50%', width: '50px', height: '50px', textAlign: 'center' }}>
                          <Link to="/add-testimonials">
                            <i className="fas fa-plus" style={{ fontSize: '30px', color: '#fff' }}></i>
                          </Link>
                        </div>
                      </div>
                      <div className="col-11">
                        <h5>All Testimonials</h5>
                        <span>Total: {servicesListings.length}</span>
                      </div>
                    </div>

                    <table id="example2" className="table table-bordered">
                      <thead>
                        <tr>
                          <th>S.N</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Sort Order</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicesListings.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`${API_IMAGE_BASE_URL}${item.testimonials_image}`}
                                alt="Testimonial"
                                style={{ width: '70px', height: '70px', borderRadius: '35px', objectFit: 'cover' }}
                              />
                            </td>
                            <td>{item.testimonials_name}</td>
                            <td>{item.testimonials_position}</td>
                            <td>{item.sort_order}</td>
                            <td>
                              <button
                                className="btn btn-xs btn-warning mr-2 p-2"
                                onClick={() => handleEdit(item.id)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-xs btn-danger p-2"
                                onClick={() => handleDelete(item.id)}
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

export default Testimonials;
