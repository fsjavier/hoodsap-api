import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import logo from "../assets/hoodsap_logo.webp";
import { HomeIcon, UserPlusIcon, KeyIcon } from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <HomeIcon className={appStyles.Icon} />
        Home
      </NavLink>
      <NavDropdown
        title={`Hello ${currentUser?.username}`}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item href="#">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
      </NavDropdown>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <UserPlusIcon className={appStyles.Icon} />
        Sign up
      </NavLink>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <KeyIcon className={appStyles.Icon} />
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand href="#home">
            <img src={logo} height={45} alt="logo" />
          </Navbar.Brand>
        </NavLink>
        <Form inline className="mx-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav className="ml-auto">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
