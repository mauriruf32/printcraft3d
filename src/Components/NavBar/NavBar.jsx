import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import logo from "../../imagenes/logo.png";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../../redux/actions/actions.js";

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
    <Navbar expand="lg" bg="transparent" data-bs-theme="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            className="d-inline-block align-top"
            src={logo}
            alt="logo"
            width="40"
            height="40"
          />{" "}
          PrintCraft3D
        </Navbar.Brand>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>

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
          <Nav.Link href="/Carrito">Carrito</Nav.Link>

          {userData ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/LoginUp">Login</Nav.Link>
          )}
        </Nav>
      </Container>

      <Container>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
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
