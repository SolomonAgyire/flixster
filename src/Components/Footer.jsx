import React from "react";
import "./Footer.css";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="copyright">© Solomon Agyire {currentYear}</p>
        </div>

        <div className="footer-section">
          <div className="social-links">
            <a
              href="https://linkedin.com/in/solomonagyire"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/solomonagyire"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/solomonagyire"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <a href="mailto:sagyire83@gmail.com" className="contact-link">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
