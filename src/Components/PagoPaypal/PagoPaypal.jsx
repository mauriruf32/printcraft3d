import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./PagoPaypal.module.css";
import Swal from "sweetalert2";

const { URL } = require("../../config.js");

//import { useHistory } from 'react-router-dom';

export default function PagoPaypal({ cart, setCart }) {
  const user = useSelector((state) => state.userData);

  useEffect(() => {
    let userData;
    if (user?.userId) {
      userData = user;
      console.log(userData)
    }

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUKGarEo-ucav0oQjyKzva7dAqIsw34z68G4K8L0gzEph-vJCrdhbbE9QYMHhBIrPSA6A4cKmu8XXvya&currency=USD";
    script.async = true;

    script.onload = () => {
      window.paypal
        .Buttons({
          style: {
            color: "blue",
            shape: "pill",
            label: "pay",
          },
          async createOrder() {
            try {
              const response = await fetch(`${URL}api/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart,
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              resultMessage(
                `Could not initiate PayPal Checkout...<br><br>${error}`
              );
            }
          },
          async onCancel(data) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Pago cancelado",
              showConfirmButton: false,
              timer: 2000,
            });
          },
          async onApprove(data, actions) {
            try {
              const response = await fetch(
                `${URL}api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cart,
                    userData,
                  }),
                }
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                  orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                resultMessage(
                  `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                localStorage.removeItem("cart");
                setCart([])
              }
            } catch (error) {
              console.error(error);
              resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
              );
            }
          },
        })
        .render("#paypal-button-container");
    };

    document.body.appendChild(script);

    // Example function to show a result to the user. Your site's UI library can be used instead.
    function resultMessage(message) {
      //const container = document.querySelector("#result-message");
      //container.innerHTML = message;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Procesando pago",
        text: 'Muchas gracias!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [cart, user, setCart]);
//<div id="paypal-button-container" className={style.divPaypal}></div>
  return (
      <div>
      {cart.length > 0 ? (
        <div className={style.container}>
        <h1>Elija su metodo de pago</h1>
      <div id="paypal-button-container" className={style.divPaypal}></div>
      </div>
    ) : (
      <div className={style.container}>
        <h1>El carrito está vacío. Agregue productos antes de proceder al pago.</h1>
        {/* Puedes mostrar un mensaje o redirigir al usuario a la página de productos, etc. */}
      </div>
    )}
    {/* Resto del contenido de la página de Inventario */}
    </div>
  );
}
