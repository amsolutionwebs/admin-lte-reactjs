import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const AddUpdateServiceList = () => {
  const title = "Add Contact Details";
  const { id } = useParams(); // Get the contactus ID from the URL
  const navigate = useNavigate(); // For redirecting after successful submission

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    intrest_in: '',
    location: '',
    whatsapp_number: '',
    about_project: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      // If there's an ID, it means we're updating an existing contactus
      axios.get(`${API_BASE_URL}/contact-us/${id}`)
        .then(response => {
          const fetchedData = response.data.contactus;
          setContactData({
            name: fetchedData.name,
            email: fetchedData.email,
            phone: fetchedData.phone,
            intrest_in: fetchedData.intrest_in,
            location: fetchedData.location,
            whatsapp_number: fetchedData.whatsapp_number,
            about_project: fetchedData.about_project,
            status: fetchedData.status,
          });
        })
        .catch(error => console.error("Error fetching the contactus data: ", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestMethod = id ? axios.put : axios.post;
    const apiUrl = id ? `${API_BASE_URL}/contact-us/${id}` : `${API_BASE_URL}/contact-us`;

    requestMethod(apiUrl, contactData)
      .then(() => {
        alert('Contactus saved successfully!');
        navigate('/contact-us'); // Redirect to contact-us list
      })
      .catch(error => {
        console.error("An error occurred while saving the contactus: ", error);
        alert('An error occurred while saving the contactus.');
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
                        <h5>{id ? 'Update' : 'Add New'} Contact</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="name"
                              id="name"
                              value={contactData.name}
                              onChange={handleInputChange}
                              placeholder="Contact Name"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                              type="email"
                              className="form-control input-sm"
                              name="email"
                              id="email"
                              value={contactData.email}
                              onChange={handleInputChange}
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="phone"
                              minLength={10}
                              maxLength={10}
                              id="phone"
                              value={contactData.phone}
                              onChange={handleInputChange}
                              placeholder="Phone"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="intrest_in">Interest In:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="intrest_in"
                              id="intrest_in"
                              value={contactData.intrest_in}
                              onChange={handleInputChange}
                              placeholder="Interest In"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="location"
                              id="location"
                              value={contactData.location}
                              onChange={handleInputChange}
                              placeholder="Location"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="whatsapp_number">Whatsapp Number:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="whatsapp_number"
                              id="whatsapp_number"
                              minLength={10}
                              maxLength={10}
                              value={contactData.whatsapp_number}
                              onChange={handleInputChange}
                              placeholder="Whatsapp Number"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="about_project">About Project:</label>
                            <textarea
                              className="form-control input-sm"
                              name="about_project"
                              id="about_project"
                              value={contactData.about_project}
                              onChange={handleInputChange}
                              rows="3"
                              placeholder="About Project"
                              required
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select
                              className="form-control"
                              name="status"
                              id="status"
                              value={contactData.status}
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

export default AddUpdateServiceList;
