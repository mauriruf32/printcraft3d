import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import axios from "axios";
import { URL } from "../../config.js";
import Orden from "./Orden.jsx";

export default function Profile({ userData }) {
  let [orders, setOrders] = useState([]);
  let [count, setCount] = useState();
  let [showOrders, setShowOrders] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let [user, setUser] = useState({});

  console.log(userData);

  useEffect(() => {
    async function fetchOrders() {
      if (userData?.userId) {
        let response = await axios.get(`${URL}Compras/${userData.userId}`);

        let ordenes = response.data.ordersWithProducts.map((order) => {
          return order.order;
        });

        setOrders(ordenes);
        setCount(response.data.count);

        let response2 = await axios.get(`${URL}User/${userData.userId}`);
        setUser({
          firstName: response2.data.user.firstName,
          lastName: response2.data.user.lastName,
          email: response2.data.user.email,
          phoneNumber: response2.data.user.phoneNumber,
        });
      }
    }
    fetchOrders();
  }, [userData]);

  let mapOrders;

  if (orders && count) {
    mapOrders = orders.map((order, index) => {
      return <Orden order={order} index={index} />;
    });
  }

  const displayOrders = () => {
    setShowOrders(!showOrders);
  };

  const displayProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className={styles.container}>
      {userData ? (
        <div>
          <div>
            <br />
            <br />
            <h1 className={styles.greeting}>
              Hola {userData.name}! Bienvenido a tu perfil
            </h1>
          </div>
          <div className={styles.info}>
            <button onClick={displayProfile} className={styles.profileButton}>
              Informacion del perfil
            </button>
            <button onClick={displayOrders} className={styles.orderButton}>
              Mostrar Compras
            </button>
            <div className={styles.contenedor}>
              {showProfile && (
                <div>
                  <ul className={styles.ulProfile}>
                    <li className={styles.li}>Nombre: {user.firstName}</li>
                    <li className={styles.li}>Apellido: {user.lastName}</li>
                    <li className={styles.li}>Email: {user.email}</li>
                    <li className={styles.li}>Telefono: {user.phoneNumber}</li>
                  </ul>
                </div>
              )}
              {showOrders && (
                <div>
                  <ul className={styles.ulOrders}>{mapOrders}</ul>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <p className={styles.loading}>Cargando perfil...</p>
      )}
    </div>
  );
}
