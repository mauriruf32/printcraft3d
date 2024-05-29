import React, { useState, useEffect } from "react";
import CardCart from "../CardCart/CardCart.jsx";
import PagoPaypal from "../PagoPaypal/PagoPaypal.jsx";
//import style from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../config.js";
import Swal from "sweetalert2";
import "./style.css";

const ShoppingCart = () => {
  const userData = useSelector((state) => state.userData);

  const [cart, setCart] = useState(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("cart"))) ||
      []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${URL}addOneToCart`, {
        userId,
        productId,
      });

      const { message } = response.data;
      if (response.status === 201) {
        let cart2 = cart;

        setCart(cart2);

        Swal.fire({
          position: "center",
          icon: "error",
          title: "No permitido",
          text: `${message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Lo siento!",
        text: "Ha ocurrido un error: " + error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleAddToCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    // console.log(cart);
    // console.log(JSON.parse(localStorage.getItem("cart")));
    // console.log(userData.userId);
    addToCart(userData.userId, id);
  };

  const removeItem = async (userId, productId) => {
    try {
      // console.log(userId);
      // console.log(productId);
      const { data } = await axios.delete(`${URL}deleteItem`, {
        data: {
          userId,
          productId,
        },
      });
      //console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const updatedCantidad = item.cantidad - 1;
        if (updatedCantidad <= 0) {
          return null;
        } else {
          return { ...item, cantidad: updatedCantidad };
        }
      }
      return item;
    });

    const filteredCart = updatedCart.filter((item) => item !== null);

    setCart(filteredCart);
    // console.log(cart);
    // console.log(JSON.parse(localStorage.getItem("cart")));
    removeItem(userData.userId, id);
  };

  const removeItems = async (userId, productId) => {
    try {
      const { data } = await axios.delete(`${URL}deleteItems`, {
        data: {
          userId,
          productId,
        },
      });
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveAllFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    removeItems(userData.userId, id);
  };

  let total = 0;
  cart.forEach((item) => (total += item.price * item.cantidad));

  const priceFormatted = parseFloat(total).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="Carrito">
      <div className="Row">
        <article className="Column1">
          <h1>Carrito de Compras:</h1>
          {cart.map((p) => (
            <CardCart
              key={p.id}
              data={p}
              addToCart={() => handleAddToCart(p.id)}
              removeFromCart={() => handleRemoveFromCart(p.id)}
              delAllFromCart={() => handleRemoveAllFromCart(p.id)}
            />
          ))}
        </article>
        <div className="Column2">
          <div>
            <div class="p-3">
              <div class="progresses">
                <div class="steps">
                  {" "}
                  <span>
                    <i class="fa fa-check"></i>
                  </span>{" "}
                </div>{" "}
                <span class="line"></span>
                <div class="steps">
                  {" "}
                  <span>
                    <i class="fa fa-check"></i>
                  </span>{" "}
                </div>{" "}
                <span class="line"></span>
                <div class="steps">
                  {" "}
                  <span class="font-weight-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>{" "}
                </div>
              </div>
            </div>
            <div class="card-body">
              <dl class="dlist-align">
                <dt>Total a pagar: {priceFormatted}</dt>
                <dd></dd>
              </dl>
              <dl>
                <dt>Descuentos: $00.00</dt>
              </dl>
              <dl>
                <dt>
                  Total: {priceFormatted}{" "}
                  <dd>
                    <strong></strong>
                  </dd>{" "}
                </dt>
              </dl>
            </div>
            <PagoPaypal cart={cart} setCart={setCart} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
