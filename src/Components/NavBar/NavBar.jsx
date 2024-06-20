import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import logo from "../../imagenes/logo_blanco.png";
import carrito from "../../imagenes/iconmonstr-shopping-cart-23-32.png";
import casita from "../../imagenes/iconmonstr-home-7-32.png";
import personita from "../../imagenes/iconmonstr-user-6-32 (1).png";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../../redux/actions/actions.js";
import style from "./NavBar.module.css";

function NavBar({ userData, logout }) {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState("");

  const handleSearchChangeLocal = (event) => {
    const newValue = event.target.value;
    setLocalSearchValue(newValue);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(updateSearchValue(localSearchValue));
    }, 500);
    return () => clearTimeout(timerId);
  }, [localSearchValue, dispatch]);

  return (
    <Navbar className={style.NavBar} expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand className="justify-content-start" href="/">
          <img
            className="d-inline-block align-top"
            src={logo}
            alt="logo"
            width="50"
            height="40"
          />{" "}
          
        </Navbar.Brand>

        <Nav.Link className="ml-5" href="/home"><img             width="30"
            height="30" src={casita} alt="" /></Nav.Link>
   

          {userData && userData.roll === "Client" ? (
            <>
              <Nav.Link href="/Profile">{userData.name}</Nav.Link>
            </>
          ) : null}

          {userData && userData.roll === "Admin" ? (
            <>
              <Nav.Link href="/UserList">UserList</Nav.Link>
              <Nav.Link href="/ProductList">ProductList</Nav.Link>
              <Nav.Link href="/Inventory">Inventario</Nav.Link>
              <Nav.Link href="/Profile">{userData.name}</Nav.Link>
            </>
          ) : null}
          {userData ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <Nav.Link className="ml-5"  href="/LoginUp"><img width="25"
            height="25" src={personita} alt="" /></Nav.Link>
          )}
          <Nav.Link className="ml-5" href="/Carrito"><img             width="30"
            height="30" src={carrito} alt="" /></Nav.Link>
        <Form className="d-flex justify-content-end">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 "
            aria-label="Search"
            onChange={handleSearchChangeLocal}
            value={localSearchValue}
          />
        </Form>
      </Container> 
    </Navbar>
  );
}

export default NavBar;
