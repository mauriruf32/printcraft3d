import React from 'react';
import logo from "../../imagenes/logo_blanco.png";
import facebook from "../../imagenes/iconmonstr-facebook-5-32.png";
import instagram from "../../imagenes/iconmonstr-instagram-15-32.png";
import twitter from "../../imagenes/iconmonstr-twitter-5-32.png";
import phone from "../../imagenes/iconmonstr-phone-9-32.png";
import email from "../../imagenes/iconmonstr-email-11-32.png";
import location from "../../imagenes/iconmonstr-location-27-32.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="container-fluid  Footer text-white">
      <div >
        <div >
          {/* <div className="col-md-6">
            <h4>Contacto:</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>Telefono:</li>
              <li>Email:</li>
              <li>Ubicacion:</li>
            </ul>
          </div> */}
          <div >
            <h4 className='pb-3'>Nuestras redes sociales:</h4>
            <div className="container_RedSoc"  >
            <a href="https://www.facebook.com" role='button' >
              <img src={facebook} alt="" />
              </a>              
              <a href="https://www.instagram.com" role='button' >
              <img src={instagram} alt="" />
                
              </a>             
              <a href="https://www.twitter.com" role='button' >
              <img src={twitter} alt="" />
                
              </a>
              <a href="https://wa.me/" role='button' >
              <img src={phone}  alt="" />
                
              </a>
              <a href="https://waww.google.com" role='button' >
              <img src={location}  alt="" />
              </a>
              <a href="https://www.gmail.com" role='button' >
              <img src={email} alt="" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-4">
          <img className="mr-2" src={logo} alt='' width="30" height="30" />
          &copy;{new Date().getFullYear()} PrintCraft3D - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
