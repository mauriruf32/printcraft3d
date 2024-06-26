import React from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../imagenes/1. CONOCE NUESTROS SERVICIOS.gif";
import image2 from "../../imagenes/2. PROMOS.png";
import image3 from "../../imagenes/3. ENVIOS.png";
import "./CarouselHome.css"

function CarouselHome() {
  return (
    
      <Carousel className="w-5 ">
        <Carousel.Item interval={5000}>
          <img className="w-100 " src={image1} alt="img1" />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img className="w-100"  src={image2} alt="img2" />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img className="w-100"  src={image3} alt="img3" />
        </Carousel.Item>
      </Carousel>
  );
}

export default CarouselHome;
