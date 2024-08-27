import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const AddUpdateSubscriber = () => {
  const title = "Add/Update Subscriber Details";
  const { id } = useParams(); // Get the subscriber ID from the URL
  const navigate = useNavigate(); // For redirecting after successful submission

  const [subscriberData, setSubscriberData] = useState({
    subscribers_email: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      // If there's an ID, it means we're updating an existing subscriber
      axios.get(`${API_BASE_URL}/subscriber/${id}`)
        .then(response => {

          const fetchedData = response.data.subscriber; // Assuming the API returns an array
          setSubscriberData({
            subscribers_email: fetchedData.subscribers_email,
            status: fetchedData.status,
          });
        })
        .catch(error => console.error("Error fetching the subscriber data: ", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setSubscriberData({
      ...subscriberData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestMethod = id ? axios.put : axios.post;
    const apiUrl = id ? `${API_BASE_URL}/subscriber/${id}` : `${API_BASE_URL}/subscriber`;

    requestMethod(apiUrl, subscriberData)
      .then(() => {
        alert('Subscriber saved successfully!');
        navigate('/subscriber'); // Redirect to subscriber list
      })
      .catch(error => {
        console.error("An error occurred while saving the subscriber: ", error);
        alert('An error occurred while saving the subscriber.');
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
                        <h5>{id ? 'Update' : 'Add New'} Subscriber</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="subscribers_email">Email:</label>
                            <input
                              type="email"
                              className="form-control input-sm"
                              name="subscribers_email"
                              id="subscribers_email"
                              value={subscriberData.subscribers_email}
                              onChange={handleInputChange}
                              placeholder="Email"
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
                              value={subscriberData.status}
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

export default AddUpdateSubscriber;
