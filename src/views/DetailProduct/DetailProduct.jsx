import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { URL } from "../../config.js";
import Reviews from "../../Components/Review/Review.jsx";
import "./DetailProduct.css";
import { products } from "../Home/Data.js";

function DetailProduct() {
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const [Producto, setProducto] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}Producto/${name}`)
      .then((response) => {
        if (response && response.data) {
          setProducto(response.data);
        } else {
          console.error("Error fetching product: Invalid response structure");
          setLoading(false);
        }
      })
      .catch((error) => {
        // Handle errors
        setLoading(false);
      });
  }, [name]);

    // Si no se pudo cargar desde la API, usar datos ficticios
    useEffect(() => {
      if (Object.keys(Producto).length === 0 && !loading) {
        const foundProduct = products.find(c => c.name === name);
        if (foundProduct) {
          setProducto(foundProduct);
        } else {
          window.alert("No hay países con ese ID");
        }
      }
    }, [Producto, name, loading]);
  
    // Si aún se está cargando, mostrar mensaje de carga
    if (loading) {
      return <div >Cargando...</div>;
    }


  return (
    <div className="detail-product-container">
      <div className="detail-product-image">
        <img src={Producto.image} alt={Producto.name} />
      </div>
      <div className="detail-product-info">
        <h4>
          <b>{Producto.name}</b>
        </h4>
        <p className="product-description">{Producto.description}</p>
        <p><strong>Size:</strong> {Producto.size}</p>
        <p><strong>Material:</strong> {Producto.materialName}</p>
        <p><strong>Category:</strong> {Producto.categoryName}</p>
        <p className="product-price">${Producto.price}</p>
        <Reviews productId={Producto.id}/>
      </div>
    </div>
  );
}

export default DetailProduct;
