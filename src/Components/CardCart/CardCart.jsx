import React from "react";
import style from "./CardCart.module.css";
import { Button } from "react-bootstrap";

const CardCart = ({ data, delAllFromCart, addToCart, removeFromCart }) => {
 const {
    id,
    name,
    image,
    // description,
    // size,
    price,
    // material,
    cantidad,
    // category,
 } = data;
 const nameM = name ? name.toUpperCase() : "Nombre no disponible";
//  const sizeM = size ? size.toUpperCase() : "Tamaño no disponible";

 const priceFormatted = parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
 });

 const subTotal = price * cantidad;
 const subTotalS = parseFloat(subTotal).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
 });

 return (
    <div className={style.Card}>
      <div className={style.ImgContainer}>
        <img className={style.Imagen} src={image} alt={name} />
      </div>
      <div className={style.Container}>
        <h3 className={style.name}>{nameM}</h3>
        <p className={style.price}>Precio: {priceFormatted}</p>
        <p className={style.category}>CANTIDAD: {cantidad}</p>
        <p>
          <b>
            {priceFormatted} x {cantidad} = {subTotalS}
          </b>
        </p>
        <div >
          <Button variant="outline-success" onClick={() => addToCart(id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></Button>{' '}
          <Button variant="outline-primary" onClick={() => removeFromCart(id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
</svg></Button>{' '}
          <Button variant="outline-danger" onClick={() => delAllFromCart(id, true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg></Button>{' '}
        </div>
      </div>
    </div>
 );
};

export default CardCart;