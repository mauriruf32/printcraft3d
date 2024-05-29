/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./Orden.module.css";

export default function Orden({ order, index }) {
  let { id, total } = order;

  const getProducts = async (data) => {
    // Utilizar Promise.all para esperar a que todas las Promises se resuelvan
    const productPromises = data.map(async (product) => {
      let foundProduct = await axios.get(`${URL}Product/${product.ProductId}`);
      return foundProduct.data; // Guardar los datos reales en lugar de la Promesa
    });

    const resolvedProducts = await Promise.all(productPromises);

    // Actualizar el estado con los datos resueltos
    return resolvedProducts;
  };
  const handleShowOrder = async () => {
    let { data } = await axios.get(`${URL}Order/${id}`);

    let resolvedProducts = await getProducts(data);

    // Formatear los productos para mostrar en la alerta
    const productHTML = resolvedProducts.map(
      (product) =>
        `<div class="product">
      <img src="${product.image}" alt="${product.name}" style="max-width: 100px; max-height: 100px;" />

      <p><strong>${product.name}</strong></p>
      <p>Precio: ${product.price}</p>

      <!-- Botón con evento onclick -->
      <button onclick="redirigirARuta('${product.id}')">Rewiu</button>
    </div>`
    );

    // Función que redirige a la ruta deseada con el ID del producto
    function redirigirARuta(productId) {
      // Reemplaza 'tu-ruta-aqui' con la ruta a la que quieres redirigir, y agrega el ID del producto
      window.location.href = `tu-ruta-aqui/${productId}`;
    }

    Swal.fire({
      title: `<strong>Tu orden ${index + 1}</strong>`,
      html: `<div class="detail-card">
     window.location.href =${URL}RatingForm/${id}+"&";        
      <div class="detail-info">
                 <p><strong>Id:</strong> ${id}</p>
                 <p><strong>Total:</strong> ${total}</p>
                 <p><strong>Productos:</strong></p>
                <div class="product-list">${productHTML.join("")}</div>
               </div>
             </div>`,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      focusConfirm: false,
    });
  };

  return (
    <div>
      <div onClick={handleShowOrder} className={styles.li}>
        <p>Tu orden {index + 1}</p>
      </div>
    </div>
  );
}
