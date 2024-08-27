import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const AddUpdateTestimonial = () => {
  const title = "My Dynamic Page Title";
  const { id } = useParams(); // Get the testimonial ID from the URL
  const navigate = useNavigate(); // For redirecting after successful submission

  const [testimonial, setTestimonial] = useState({
    testimonials_name: '',
    testimonials_position: '',
    testimonials_content: '',
    testimonials_image: null,
    sort_order: '',
    status: 'enable',
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      // If there's an ID, it means we're updating an existing testimonial
      axios.get(`${API_BASE_URL}/testimonials/${id}`)
        .then(response => {
          const fetchedData = response.data.testimonials;
          setTestimonial({
            testimonials_name: fetchedData.testimonials_name,
            testimonials_position: fetchedData.testimonials_position,
            testimonials_content: fetchedData.testimonials_content,
            sort_order: fetchedData.sort_order,
            status: fetchedData.status,
            testimonials_image: null, // Reset the image for update
          });
          setPreviewImage(`${API_IMAGE_BASE_URL}${fetchedData.testimonials_image}`);
        })
        .catch(error => console.error("Error fetching the testimonial data: ", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setTestimonial({
      ...testimonial,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTestimonial({
      ...testimonial,
      testimonials_image: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // If your backend expects JSON instead of FormData
    const formData = {
      testimonials_name: testimonial.testimonials_name,
      testimonials_position: testimonial.testimonials_position,
      testimonials_content: testimonial.testimonials_content,
      sort_order: testimonial.sort_order,
      status: testimonial.status,
    };
  
    if (testimonial.testimonials_image) {
      // If your backend expects the image as part of FormData
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append('testimonials_image', testimonial.testimonials_image);
  
      const requestMethod = id ? axios.put : axios.post;
      const apiUrl = id ? `${API_BASE_URL}/testimonials/${id}` : `${API_BASE_URL}/testimonials`;
  
      requestMethod(apiUrl, data)
        .then(() => {
          alert('Testimonial saved successfully!');
          navigate('/testimonials'); // Redirect to testimonials list
        })
        .catch(error => {
          console.error("An error occurred while saving the testimonial: ", error);
          alert('An error occurred while saving the testimonial.');
        });
    } else {
      // If you are sending JSON data (excluding the image)
      const requestMethod = id ? axios.put : axios.post;
      const apiUrl = id ? `${API_BASE_URL}/testimonials/${id}` : `${API_BASE_URL}/testimonials`;
  
      requestMethod(apiUrl, formData)
        .then(() => {
          alert('Testimonial saved successfully!');
          navigate('/testimonials'); // Redirect to testimonials list
        })
        .catch(error => {
          console.error("An error occurred while saving the testimonial: ", error);
          alert('An error occurred while saving the testimonial.');
        });
    }
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
                        <h5>{id ? 'Update' : 'Add New'} Testimonials</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <label htmlFor="testimonials_name">Testimonial Name:</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="testimonials_name"
                              value={testimonial.testimonials_name}
                              onChange={handleInputChange}
                              placeholder="Testimonial Name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="testimonials_position">Position :</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              name="testimonials_position"
                              value={testimonial.testimonials_position}
                              onChange={handleInputChange}
                              placeholder="Position"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="testimonials_content">Testimonials Content:</label>
                            <textarea
                              className="form-control input-sm"
                              name="testimonials_content"
                             
                              defaultValue={testimonial.testimonials_content}
                              onChange={handleInputChange}
                              rows="3"
                              placeholder="Testimonial Content"
                              required
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="testimonials_image">Testimonials Image:</label>
                            <input
                              type="file"
                              className="form-control input-sm"
                              name="testimonials_image"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <small className="help-block" style={{ color: 'red', fontSize: '10px' }}>
                              Browse only .jpg /.jpeg /.png /.PNG image. (Dimension: 1920 X 820 px)
                            </small>
                            {previewImage ? (
                              <img id="output_banner" src={previewImage} alt="Preview" height="100" />
                            ) : (
                              <img id="output_banner" src="/path/to/placeholder/image.png" alt="No Image" height="100" />
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="sort_order">Sort Order:</label>
                            <input
                              type="number"
                              className="form-control input-sm"
                              name="sort_order"
                              value={testimonial.sort_order}
                              onChange={handleInputChange}
                              placeholder="Sort Order"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select
                              className="form-control"
                              name="status"
                              value={testimonial.status}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="enable">Enable</option>
                              <option value="disable">Disable</option>
                            </select>
                          </div>
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

export default AddUpdateTestimonial;
