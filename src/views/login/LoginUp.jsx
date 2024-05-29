// Import dependencies
import axios from "axios";
import React, { useState } from "react";
import style from "./Login.module.css";
import { URL } from "../../config.js";


// Define the Login component
export default function LoginUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the server
      const response = await axios.post(`${URL}login`, formData);

      if (response.status === 200) {
        // Successful login
        alert("Login successful");
      } else {
        // Handle other status codes (e.g., 401 for authentication failure)
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className={style.formBackground}>
      
      <div className={style.formContainer}>
        <form className={style.loginForm} onSubmit={handleFormSubmit}>
          <h2 className={style.loginF}>LOGIN</h2>

          {/* Email input */}
          <div className={style.logiConten}>
            <label htmlFor="email" className={style.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={style.formInput}
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password input */}
          <div className={style.logiConten}>
            <label htmlFor="password" className={style.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={style.formInput}
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Submit button */}
          <div className={style.submitButtonConten}>
            <button type="submit" className={style.submitButton}>
              INICIAR
            </button>
          </div>

          {/* Registration link */}
          <h4 className={style.subButton}>
            ¿Aún no te has registrado?
            <span> Regístrate</span>
          </h4>
        </form>
      </div>
    </div>
  );
}
