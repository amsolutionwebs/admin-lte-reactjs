import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from './common/Navbar';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';


const AddPages = () => {
    const title = "My Dynamic Page Title";

  const { action, post } = useParams();
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState({
    post_title: '',
    post_content: '',
    seo_title: '',
    meta_keywords: '',
    meta_description: '',
    canonical_tag: '',
    post_status: 'enable',
    sort_order: 0,
    post_image: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (action === 'update' && post) {
      axios.get(`/api/pages/${post}`)
        .then(response => {
          setPostData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [action, post]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      formData.append(key, postData[key]);
    });
    if (file) {
      formData.append('post_image', file);
    }

    const url = action === 'update' ? `/api/pages/${post}` : '/api/pages';
    const method = action === 'update' ? 'put' : 'post';

    axios({ method, url, data: formData })
      .then(response => {
        alert('Page saved successfully');
        navigate('/some-route'); // Redirect after successful submission
      })
      .catch(error => {
        console.error('Error saving data:', error);
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
              <div className="card mt-2 px-1" style={{ borderTop: '3px solid tomato' }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-1">
                      <div className="d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: 'tomato', borderRadius: '50%', width: '50px', height: '50px', textAlign: 'center' }}>
                        <i className="fa fa-plus" style={{ fontSize: '30px', color: '#fff' }}></i>
                      </div>
                    </div>
                    <div className="col-11">
                      <h5>{action === 'update' ? 'Update Pages' : 'Add New Pages'}</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body border">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="page_title">Page Title:</label>
                          <input type="text" className="form-control input-sm" name="post_title" id="page_title" value={postData.post_title} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="page_content">Page Content:</label>
                          <textarea className="form-control input-sm" name="post_content" id="page_content" rows="3" value={postData.post_content} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="seo_title">SEO Title:</label>
                          <input type="text" className="form-control" name="seo_title" id="seo_title" value={postData.seo_title} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="meta_description">Meta Description:</label>
                          <textarea className="form-control input-sm" name="meta_description" id="meta_description" rows="3" value={postData.meta_description} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="canonical_tag">Canonical:</label>
                          <textarea className="form-control input-sm" name="canonical_tag" id="canonical_tag" rows="1" value={postData.canonical_tag} onChange={handleInputChange}></textarea>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="meta_keywords">Meta Keywords:</label>
                          <input type="text" className="form-control input-sm" name="meta_keywords" id="meta_keywords" value={postData.meta_keywords} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="post_image">Page Image:</label>
                          <input type="file" className="form-control input-sm" name="post_image" accept="image/*" onChange={handleFileChange} />
                          <span className="help-block" style={{ color: 'red' }}>Browse only .jpg /.JPEG /.png /.PNG image. (Dimension:1920 X 820 px)</span>
                          {postData.post_image && (
                            <img id="output_banner" src={`upload/post-images/${postData.post_image}`} alt="Post" height="100" />
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="sort_order">Sort Order:</label>
                          <input type="number" className="form-control input-sm" name="sort_order" id="sort_order" value={postData.sort_order || 0} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status:</label>
                          <select className="form-control" name="post_status" id="status" value={postData.post_status} onChange={handleInputChange}>
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-5">
                      <input type="hidden" name="submit" value={action === 'update' ? 'update' : 'publish'} />
                      <input type="hidden" name="post_id" value={post} />
                      <input type="hidden" name="post_type" value="page" />
                      <input type="submit" value={action === 'update' ? 'Update' : 'Publish'} className="btn form-control" style={{ backgroundColor: 'yellowgreen', color: 'white' }} />
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

export default AddPages;
