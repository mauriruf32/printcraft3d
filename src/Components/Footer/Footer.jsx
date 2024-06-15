import React from 'react';
import logoLuna from "../../imagenes/logo_blanco_luna.png";
import facebook from "../../imagenes/iconmonstr-facebook-5-32.png";
import instagram from "../../imagenes/iconmonstr-instagram-15-32.png";
import twitter from "../../imagenes/iconmonstr-twitter-5-32.png";
import phone from "../../imagenes/iconmonstr-phone-9-32.png";
import email from "../../imagenes/iconmonstr-email-11-32.png";
import location from "../../imagenes/iconmonstr-location-27-32.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="container-fluid Footer text-white">
      <div className="d-flex justify-content-between align-items-center">
        <div className="container_RedSoc ">
          <h5 className='pb-4 pt-3 bm-1'>Contacto</h5>
          <div className="pb-3 d-flex">
            <a href="https://www.facebook.com" role='button'>
              <img src={facebook} alt="Facebook" />
            </a>              
            <a href="https://www.instagram.com" role='button'>
              <img src={instagram} alt="Instagram" />
            </a>             
            <a href="https://www.twitter.com" role='button'>
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="https://wa.me/" role='button'>
              <img src={phone} alt="Phone" />
            </a>
            <a href="https://waww.google.com" role='button'>
              <img src={location} alt="Location" />
            </a>
            <a href="https://www.gmail.com" role='button'>
              <img src={email} alt="Email" />
            </a>
          </div>
        </div>
        <div className="logo-section">
          <a href="/" role='button'>
            <img src={logoLuna} alt="logo_luna" width="100" height="100"/>
          </a>
        </div>
      </div>
      <p className="mt-2 text-center">
        &copy;{new Date().getFullYear()} PrintCraft3D - All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
