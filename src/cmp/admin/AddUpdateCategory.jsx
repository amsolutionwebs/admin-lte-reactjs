import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL_TWO } from '../../config'; // Ensure you use the correct base URL
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const AddUpdateCategory = () => {
  const title = "Add/Update Category";
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate(); // For redirecting after successful submission

  const [categoryData, setCategoryData] = useState({
    category_name: '',
    status: 'enable', // Set default value if needed
  });

  useEffect(() => {
    if (id) {
      // If there's an ID, it means we're updating an existing category
      axios.get(`${API_BASE_URL_TWO}/categories/${id}`)
        .then(response => {
          const fetchedData = response.data.category;
          setCategoryData({
            category_name: fetchedData.category_name,
            status: fetchedData.status,
          });
        })
        .catch(error => {
          console.error("Error fetching the category data: ", error);
          // Handle error (e.g., display a message to the user)
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestMethod = id ? axios.put : axios.post;
    const apiUrl = id ? `${API_BASE_URL_TWO}/update-category/${id}` : `${API_BASE_URL_TWO}/create-category`;

    requestMethod(apiUrl, categoryData)
      .then(() => {
        alert('Category saved successfully!');
        navigate('/category'); // Redirect to categories list
      })
      .catch(error => {
        // Handle error response
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.errors && Array.isArray(errorData.errors)) {
            // Join errors array into a single string
            const errorMessages = errorData.errors.join(', ');
            alert(`Validation Error: ${errorMessages}`);
          } else {
            // Handle other possible error formats
            alert('An error occurred while saving the category.');
          }
        } else {
          // Handle cases where error response is not available
          alert('An unexpected error occurred.');
        }
        console.error("An error occurred while saving the category: ", error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Navbar />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card single_courses mt-2 px-1" style={{ borderTop: '3px solid tomato' }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-1">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: 'tomato',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                          }}
                        >
                          <i className="fa fa-plus" style={{ fontSize: '30px', color: '#fff' }}></i>
                        </div>
                      </div>
                      <div className="col-11">
                        <h5>{id ? 'Update' : 'Add New'} Category</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="category_name">Category Name:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="category_name"
                              id="category_name"
                              value={categoryData.category_name}
                              onChange={handleInputChange}
                              placeholder="Category Name"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select
                              className="form-control"
                              name="status"
                              id="status"
                              value={categoryData.status}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="enable">Enable</option>
                              <option value="disable">Disable</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-12 mt-5">
                          <button
                            type="submit"
                            className="btn form-control"
                            style={{ backgroundColor: 'yellowgreen', color: 'white' }}
                          >
                            {id ? 'Update' : 'Publish'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AddUpdateCategory;
