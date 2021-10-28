import * as React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../logo.svg";

function Menu() {
  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Code Exercise (Toys)
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Menu;
