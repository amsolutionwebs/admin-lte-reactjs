import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from '../src/cmp/login/LoginForm ';
import ForgotPassword from '../src/cmp/login/ForgotPassword';
import SubmitOtp from '../src/cmp/login/SubmitOtp';
import ChangePassword from '../src/cmp/login/ChangePassword';


import Dashboard from '../src/cmp/admin/Dashboard';
import UpdateProfile from './cmp/admin/UpdateProfile';
import AddPages from './cmp/admin/AddPages';
import PagesList from './cmp/admin/PagesList';
import BannerList from './cmp/admin/BannerList';
import AddBanner from './cmp/admin/AddBanner';
import Testimonials from './cmp/admin/Testimonials';
import AddUpdateTestimonial from './cmp/admin/AddTestimonials';
import ContactUs from './cmp/admin/ContactUs';
import AddUpdateContactUs from './cmp/admin/AddUpdateContactUs';
import Subscriber from './cmp/admin/Subscriber';
import AddUpdateSubscriber from './cmp/admin/AddUpdateSubscriber';

import Category from './cmp/admin/Category';
import AddUpdateCategory from './cmp/admin/AddUpdateCategory';

import ServiceList from './cmp/admin/ServiceList';
import AddUpdateServiceList from './cmp/admin/AddUpdateServiceList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/submit-otp" element={<SubmitOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/add-pages" element={<AddPages />} />
        <Route path="/pages-list" element={<PagesList />} />
        <Route path="/banner-list" element={<BannerList />} />
        <Route path="/add-banner" element={<AddBanner />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/add-testimonials" element={<AddUpdateTestimonial />} />
        <Route path="/add-testimonials/:id" element={<AddUpdateTestimonial />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-contact-us" element={<AddUpdateContactUs />} />
        <Route path="/add-contact-us/:id" element={<AddUpdateContactUs />} />

        <Route path="/subscriber" element={<Subscriber />} />
        <Route path="/add-subscriber" element={<AddUpdateSubscriber />} />
        <Route path="/add-subscriber/:id" element={<AddUpdateSubscriber />} />

        <Route path="/category" element={<Category />} />
        <Route path="/add-category" element={<AddUpdateCategory />} />
        <Route path="/add-category/:id" element={<AddUpdateCategory />} />

        <Route path="/service-list" element={<ServiceList />} />
        <Route path="/add-service-list" element={<AddUpdateServiceList />} />
        <Route path="/add-service-list/:id" element={<AddUpdateServiceList />} />

        
      </Routes>
    </Router>
  );
}

export default App;
