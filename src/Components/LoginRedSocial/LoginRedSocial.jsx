/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import google from "../../imagenes/google.png";
import axios from "axios";
import { URL } from "../../config.js";
import { GoogleAuthProvider, signInWithPopup, auth } from "../../firebase.js";
import { LoginUser } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";

const LoginRedSocial = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(userData);

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(`${URL}Google`, {
        firstName: user.displayName,
        email: user.email,
        roll: "Client",
      });
      console.log("response", response);

      const receivedToken = response.data.token;
      const id = response.data.id;
      localStorage.setItem("token", receivedToken);

      // Actualizar el estado si el usuario ya está registrado
      setUserRegistered(true);
      dispatch(
        LoginUser({
          firstName: user.displayName,
          email: user.email,
          roll: "Client",
        })
      );

      console.log("LoginUser", LoginUser);

      const userDataFromResponse = {
        firstName: user.displayName,
        email: user.email,
        roll: "Client",
        userId: id, // Use the userId from the response
      };

      if (id) {
        createCart(userDataFromResponse.userId);
      }

      setUserData(userDataFromResponse);
      window.location.href = "/Profile";
    } catch (error) {
      console.error("Error al autenticar con Google:", error.message);
      console.error("Detalles del error:", error.response);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async (userId) => {
    try {
      const { data } = await axios.post(`${URL}shoppingCart`, {
        userId,
      });
      // console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container w-100 my-4">
      <div className="row text-center">
        <div className="col-12">Iniciar Sesión</div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-danger w-100 my-1"
            onClick={handleGoogleSignIn}
            disabled={userRegistered}
          >
            <div className="row align-items-center">
              <div className="col-2">
                <img src={google} alt="Google" width="32" className="" />
              </div>
              <div className="col-10 text-center">Google</div>
            </div>
          </button>
        </div>
      </div>
      {loading && (
        <div className="row text-center mt-2">
          <div className="col-12">Cargando...</div>
        </div>
      )}
      {userRegistered && userData && (
        <div className="row text-center mt-2">
          <div className="col-12"></div>
        </div>
      )}
    </div>
  );
};

export default LoginRedSocial;
