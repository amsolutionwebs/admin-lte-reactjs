import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <footer className="main-footer" style={{ position: 'relative', bottom: '0px !important' }}>
      <strong>
        Copyright &copy; Multi Venor E Commerce - {currentYear}-{nextYear}.
      </strong>
      All rights reserved.
    </footer>
  );
};

export default Footer;
