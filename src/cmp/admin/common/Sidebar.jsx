import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", route: "/dashboard", icon: "fas fa-tachometer-alt" },
    { id: 2, name: "Pages List", route: "/pages-list", icon: "far fa-circle nav-icon", parent: "Pages" },
    { id: 3, name: "Add New Page", route: "/AddPages", icon: "far fa-circle nav-icon", parent: "Pages" },
    { id: 4, name: "Banner List", route: "/BannerList", icon: "far fa-circle nav-icon", parent: "Banner" },
    { id: 5, name: "Add New Banner", route: "/AddBanner", icon: "far fa-circle nav-icon", parent: "Banner" },
    { id: 6, name: "Add New Testimonials", route: "/add-testimonials", icon: "far fa-circle nav-icon", parent: "Testimonials" },
    { id: 7, name: "Testimonials List", route: "/testimonials", icon: "far fa-circle nav-icon", parent: "Testimonials" },
    { id: 8, name: "Add New Contact Us", route: "/add-contact-us", icon: "far fa-circle nav-icon", parent: "ContactUs" },
    { id: 9, name: "Contact Us List", route: "/contact-us", icon: "far fa-circle nav-icon", parent: "ContactUs" },
    { id: 10, name: "Add New Subscriber", route: "/add-subscriber", icon: "far fa-circle nav-icon", parent: "Subscriber" },
    { id: 11, name: "Subscriber List", route: "/subscriber", icon: "far fa-circle nav-icon", parent: "Subscriber" },

    { id: 12, name: "Add New Category", route: "/add-category", icon: "far fa-circle nav-icon", parent: "Category" },
    { id: 13, name: "Category List", route: "/category", icon: "far fa-circle nav-icon", parent: "Category" },
   
    { id: 14, name: "Add New Services List", route: "/add-service-list", icon: "far fa-circle nav-icon", parent: "ServiceList" },
    { id: 15, name: "Services List", route: "/service-list", icon: "far fa-circle nav-icon", parent: "ServiceList" },
    
    { id: 16, name: "Log Out", route: "/logout", icon: "fas fa-sign-out-alt" },
    
  ];

  const location = useLocation();

  const getMenuItems = (parentName) => {
    return sidebarItems
      .filter(item => item.parent === parentName)
      .map(item => (
        <li key={item.id} className="nav-item">
          <Link to={item.route} className={`nav-link ${isActive(item.route) ? "active" : ""}`}>
            <i className={item.icon}></i>
            <p>{item.name}</p>
          </Link>
        </li>
      ));
  };

  const isParentMenuOpen = (parentName) => {
    return sidebarItems.some(item => 
      item.parent === parentName && location.pathname.includes(item.route)
    );
  };

  const isActive = (route) => location.pathname === route;

  const uniqueParents = [...new Set(sidebarItems.map(item => item.parent).filter(parent => parent))];

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link">
        <img 
          src="/dist/img/AdminLTELogo.png" 
          alt="AdminLTE Logo" 
          className="brand-image img-circle elevation-3" 
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-bold text-dark">ADMIN PANEL</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img 
              src="/dist/img/dummy_profile.jpg" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff' }} 
              alt="Profile Picture"
            />
          </div>
          <div className="info">
            <Link to="/dashboard" className="d-block" style={{ textTransform: 'capitalize' }}>
              Aman Kumar
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Dashboard Item */}
            <li className={`nav-item ${isActive("/dashboard") ? "menu-open" : ""}`}>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {/* Settings Header */}
            <li className="nav-header">SETTINGS SECTION</li>

            {/* Dynamically Generated Menu Items */}
            {uniqueParents.map(parent => (
              <li key={parent} className={`nav-item ${isParentMenuOpen(parent) ? "menu-open" : ""}`}>
                <Link to="#" className="nav-link">
                  <i className="nav-icon fa fa-paper-plane"></i>
                  <p>{parent}<i className="fas fa-angle-left right"></i></p>
                </Link>
                <ul className="nav nav-treeview">
                  {getMenuItems(parent)}
                </ul>
              </li>
            ))}

            {/* Log Out Item */}
            <li className={`nav-item ${isActive("/logout") ? "menu-open" : ""}`}>
              <Link to="/logout" className={`nav-link ${isActive("/logout") ? "active" : ""}`}>
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Log Out</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
